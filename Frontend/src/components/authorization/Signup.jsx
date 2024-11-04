import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'

const Signup = () => {
    const [input, setInput] = useState({
        fullname:'',
        email:'',
        phoneNumber:'',
        password:'',
        role:'',
        file:''
    })

    const navigate = useNavigate();

    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }

    const changeFileHandler = (e) => {
        setInput({...input, file:e.target.files?.[0]});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new formData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentails:true
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } 
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name:</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your Full Name here"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Email:</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your Email here"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number:</Label>
                        <Input
                            type="number"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="0123456789"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Password:</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your Password here"
                        />
                    </div>
                    <div>
                        <Label>Select Your Role:</Label><br />
                        <input
                            type="radio"
                            name="role"
                            value="seeker"
                            checked={input.role == "seeker"}
                            onChange={changeEventHandler}
                        />
                            Seeker<br />
                        <input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role == "recruiter"}
                            onChange={changeEventHandler}
                        />
                            Recruiter
                    </div><br/>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            accept = "image/*"
                            type = "file"
                            onChange={changeFileHandler}
                            className='cursor-pointer'
                        />
                    </div>
                    <Button type='submit' className='w-full my-4'>Signup</Button>
                    <span>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup