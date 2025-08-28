import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, studentId } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Generate studentId if not provided and role is student
    let finalStudentId = studentId;
    if (role === "student" && !studentId) {
      const count = await User.countDocuments({ role: "student" });
      finalStudentId = `STU${String(count + 1).padStart(4, '0')}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date();
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role,
      studentId: finalStudentId,
      registrationDate: currentDate,
      memberSince: currentDate.getFullYear()
    });

    // Format response with display titles
    const userResponse = user.toObject();
    delete userResponse.password;
    
    // Add display information
    if (user.role === 'student') {
      userResponse.displayTitle = `Scholar ${user.name}`;
      userResponse.greeting = 'Welcome to your learning journey';
      userResponse.dashboardTitle = 'Student Learning Portal';
    } else if (user.role === 'admin') {
      userResponse.displayTitle = `Administrator ${user.name}`;
      userResponse.greeting = 'Welcome to the admin dashboard';
      userResponse.dashboardTitle = 'Library Administration Portal';
    }
    
    res.json({
      user: userResponse,
      message: userResponse.greeting,
      displayTitle: userResponse.displayTitle
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, redirectTo } = req.body;
    const user = await User.findOne({ email }).select('+password'); // explicitly include password
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create token with additional info
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role,
        studentId: user.studentId,
        name: user.name
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    // Format user data based on role with different titles
    let displayTitle = '';
    let greeting = '';

    if (user.role === 'student') {
      displayTitle = `Scholar ${user.name}`;
      greeting = 'Welcome back to your learning journey';
    } else if (user.role === 'admin') {
      displayTitle = `Administrator ${user.name}`;
      greeting = 'Welcome to the admin dashboard';
    }

    const userData = {
      id: user._id,
      name: user.name,
      displayTitle: displayTitle,
      greeting: greeting,
      email: user.email,
      role: user.role,
      ...(user.role === 'student' && {
        studentId: user.studentId,
        plan: user.plan,
        activeSubscription: user.activeSubscription,
        registrationDate: new Date().toISOString(),
        memberSince: new Date().getFullYear(),
        displayName: `Scholar ${user.name}`,
        dashboardTitle: 'Student Learning Portal'
      }),
      ...(user.role === 'admin' && {
        displayName: `Administrator ${user.name}`,
        dashboardTitle: 'Library Administration Portal',
        accessLevel: 'Full Access'
      })
    };

    res.json({ 
      token, 
      user: userData,
      message: greeting,
      displayTitle: displayTitle,
      redirectTo: redirectTo || '/dashboard',
      shouldShowPlans: !user.activeSubscription,
      nextAction: !user.activeSubscription ? {
        type: 'SHOW_PLANS',
        message: 'Please select a subscription plan to continue'
      } : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
