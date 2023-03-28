import React, { useState } from 'react'
import { getMovies } from '../global/api';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const Dashboard = () => {
    const options = ['One', 'Two', 'Three', 'Four', 'Five'];
    const [rec, setRec] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        getMovies({ username: event.email}).then(res => {
            setRec(res.data)
            // navigate("/alllist")
            // setError("")
          }).catch(err => { setError("Unable To Fetch"); console.log(err) })
            .finally(() => {
              setLoading(false)
            })
    }
    return (
        <div>
            <select onChange={onOptionChangeHandler}>

                <option>Please choose one option</option>
                {options.map((option, index) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
            </select>
            {error && <p className='text-sm text-red-500 mt-4'>{error}</p>}
            {!loading ? <p>Login</p> : <HourglassBottomIcon style={{ fontSize: "1rem" }} />}

            {rec.map((item, idx) => {
                return (
                    <div key={idx}>
                        <img src={item.src} alt={item.title} />
                        <p>{item.title}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard