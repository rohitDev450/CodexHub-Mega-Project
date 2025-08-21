import User from '../model/UserModel.js';
import  bcryptjs from 'bcryptjs'; // Import compare function from bcrypt

const singUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email }); 
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password,8)
        const createdUser = new User({
            fullname:fullname,
            email:email,
            password:hashPassword
        });
        await createdUser.save();
        res.status(201).json({ message: "User Created Successfully", user: {
            _id: createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email
        }});
    } catch (error) {
        console.log("Error : " + error.message);
        res.status(500).json({ message: "Internal error occur" });
    }
};

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid UserName or password" });
        }
        const isMatch = await bcryptjs.compare(password, user.password); // Compare hashed password with plaintext password
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid UserName or password" });
        }
        res.status(200).json({ message: "User Login Successfully", user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        } });
    } catch (error) {
        console.log("Error : " + error.message);
        res.status(500).json({ message: "Internal error occur" });
    }
};

export default { singUp, login };
