import { useEffect, useState } from 'react'
import './generator.css'
import { Configuration, OpenAIApi } from 'openai'
import openAiLogo from '../image/openAiLogo.svg'
import fakeImage from '../image/fakeimage.svg'


const configuration = new Configuration({
    apiKey: import.meta.env.VITE_MY_API_KEY,
});

const openai = new OpenAIApi(configuration);



function Generator() {

    const [userPrompt, setUserPrompt] = useState("");
    const [imageSize, setImageSize] = useState("256x256");
    const [image, setImage] = useState("");
    const [isloading, setIsLoading] = useState(false);


    const fakeImageUrl = "https://cdn-icons-png.flaticon.com/512/1160/1160358.png";
    // console.log('first', imageSize)



    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await openai.createImage({
                prompt: userPrompt,
                n: 1,
                size: imageSize,
            });
            // console.log(response);
            setImage(response.data.data[0].url)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (image === "") {
            setImage(fakeImageUrl)
        }
    })


    return (
        <div >
            <div className='openAi'>
                <div className='logo'>
                    <a href="https://platform.openai.com/docs/introduction" target="_blank"><img src={openAiLogo} alt="" style={{ width: "10rem", marginRight: "3rem" }} /></a>
                </div>

            </div>

            <div className='content-box'>

                <div className="left__box">
                    <div className='main'>
                        <h1 className='heading'>Describe to Generate the Image</h1>
                        <div className='input__field'>
                            <input onChange={(e) => setUserPrompt(e.target.value)} type="text" placeholder='Enter text here' required />

                            <select name="size" className="size" onChange={(e) => setImageSize(e.target.value)}>
                                <option value="256x256">small</option>
                                <option value="512x512">medium</option>
                            </select>
                        </div>
                        <button onClick={fetchData}>Generate</button>
                    </div>
                </div>

                <div className="right-box" >
                    {
                        isloading ?
                            (
                                <div className='loadingText'>
                                    <p>Loading...</p>
                                    <p>😊 Please wait until your image is ready.</p>
                                </div>)
                            :
                            <img src={image} alt="Your image will shown here" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Generator;