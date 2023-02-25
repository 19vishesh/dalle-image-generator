import { useState } from 'react'
import './generator.css'
import { Configuration, OpenAIApi } from 'openai'


const configuration = new Configuration({
    apiKey: import.meta.env.VITE_MY_API_KEY,
});

const openai = new OpenAIApi(configuration);



function Generator() {

    const [userPrompt, setUserPrompt] = useState("");
    const [image, setImage] = useState("");
    const [isloading, setIsLoading] = useState(false);



    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await openai.createImage({
                prompt: userPrompt,
                n: 1,
                size: "512x512"
            });
            // console.log(response);
            setImage(response.data.data[0].url)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    }

    return (
        <>
            <h1 className='heading'>Describe to Generate the Image</h1>
            <div>
                <input onChange={(e) => setUserPrompt(e.target.value)} type="text" placeholder='Enter text here' required />
                <button onClick={fetchData}>Generate</button>
            </div>
            <div style={{ width: "100%", height: 512 }} className="imageDiv">
                {
                    isloading ?
                        (
                            <>
                                <p>Loading...</p>
                                <p>😊 Please wait until your image is ready.</p>
                            </>)
                        :
                        <img src={image} alt="Ai-generated-image" />
                }
            </div>
        </>
    )
}

export default Generator
