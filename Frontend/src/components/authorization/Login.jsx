import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    })

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentails: true
            });
            if (res.data.success) {
                navigate("/");
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
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
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
                    </div><br />
                    <Button type='submit' className='w-full my-4'>Login</Button>
                    <span>Don't have an account? <Link to='/signup' className='text-blue-600'>Sign Up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login