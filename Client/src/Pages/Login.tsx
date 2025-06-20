
import {Box, Button, Divider, Input, Link, Typography} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from "../utils/APICalls"
import type { User } from "../Types/Types"

function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [user, setUser] = useState <User | null>(null)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const login = async () => {
        try{
            const body = {
                email: userData.email,
                password: userData.password
            }
            const result: User = await logIn('http://127.0.0.1:5000/user/login', body )
            setUser(result)
            console.log(user)
            if(user?.access_token){
                localStorage.setItem('access_token', user.access_token)
                localStorage.setItem('name', user.name)
                localStorage.setItem('userId', user.id.toString())
                navigate('/Dashboard')
            }

        }catch{
            console.log('error')
        }
    }

    const navigate = useNavigate()
  return (
    <Box 
        height={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
    >
        <Box 
            borderRadius={'5px'} 
            width={'auto'}
            padding={'3rem'}
            bgcolor= 'background.paper'
        >
            <Typography 
                variant="h3" 
                marginBottom={'2rem'}
            >
                LOG IN
            </Typography>
            <Divider orientation="horizontal"/>
            <Box
                marginTop={'1rem'}
                marginBottom={'1rem'}
            >
                <Typography variant="subtitle1"> email</Typography>
                <Input name="email" onChange={handleInput} value={userData.email}></Input>
                <Typography variant="subtitle1"  marginTop={'1rem'}> password</Typography>
                <Input name='password' onChange={handleInput} value={userData.password}></Input>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
            >
                <Button
                    fullWidth
                    onClick={()=>login()}
                >
                    LOG IN
                </Button>
            </Box>
        </Box>
        <Typography variant="subtitle1" marginTop={'2rem'}>
            new user ? <Link onClick = {()=> navigate('/Register')} >Register</Link>
        </Typography>
    </Box>
  )
}

export default Login