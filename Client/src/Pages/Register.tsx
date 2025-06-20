
import {Box, Button, Divider, Input, Link, Typography} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendData } from "../utils/APICalls"
import { Password } from "@mui/icons-material"

function Register() {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    })
    //const [message, setMessage] = useState('')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const registerUser = async () => {
        try{
            const body = {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            password: userData.password
            }
            const result = sendData('http://127.0.0.1:5000/user/register', body )

            {/*if(result.ok){
                setMessage(result.message)
            } */}
            navigate('/')
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
                REGISTER
            </Typography>
            <Divider orientation="horizontal"/>
            <Box
                marginTop={'1rem'}
                marginBottom={'1rem'}
            >
                <Typography variant="subtitle1" marginTop={'1rem'}> Name</Typography>
                <Input fullWidth name="name" onChange={handleInput} value={userData.name}></Input>
                <Typography variant="subtitle1" marginTop={'1rem'}> Surname</Typography>
                <Input fullWidth name="surname" onChange={handleInput} value={userData.surname}></Input>
                <Typography variant="subtitle1" marginTop={'1rem'}> Email</Typography>
                <Input fullWidth name="email" onChange={handleInput} value={userData.email}></Input>
                <Typography variant="subtitle1"  marginTop={'1rem'}> Password</Typography>
                <Input  fullWidth name="password" onChange={handleInput} value={userData.password}></Input>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
            >
                <Button
                    fullWidth
                    onClick={()=>registerUser()}
                >
                    Register
                </Button>
            </Box>
        </Box>
        <Typography variant="subtitle1" marginTop={'2rem'}>
            Already a User ? <Link onClick = {()=> navigate('/')} >Login</Link>
        </Typography>
    </Box>
  )
}

export default Register