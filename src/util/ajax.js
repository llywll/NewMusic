import Vaxios from 'axios'

export default Vaxios.create({
    withCredentials: true,
    headers:{
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

