import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Question.css';
import sub from '../ui/submitbtn.png';
import pre from '../ui/prebtn.png';
import next from '../ui/nextbtn.png';
import a1 from '../ui/a1.png';
import a2 from '../ui/a2.png';
import a3 from '../ui/a3.png';
import a4 from '../ui/a4.png';
import a5 from '../ui/a5.png';
import m1 from '../ui/m1.png';
import m2 from '../ui/m2.png';
import m3 from '../ui/m3.png';
import m4 from '../ui/m4.png';
import s1 from '../ui/s1.png';
import s2 from '../ui/s2.png';
import s3 from '../ui/s3.png';
import s4 from '../ui/s4.png';
import t1 from '../ui/t1.png';
import t2 from '../ui/t2.png';
import t3 from '../ui/t3.png';
import t4 from '../ui/t4.png';
import t5 from '../ui/t5.png';

const Question = () => {
    const navigate = useNavigate()

    const questions = [
        {
        id: 1,
        text: "What's your age?", 
        options: ["20's", "30's", "40's", "50's", "over 60's"],
        imgs: [a1, a2, a3, a4, a5]
        },
        {
        id: 2,
        text: "Which of these categories suits you the most?", 
        options: ["Food/Gourmet Tour", "Shopping", "Nature appreciation", "Historic/Cultural Sites/Traditional Cultural Experience", "Etc"],
        imgs: [t1, t2, t3, t4, t5] 
        },
        {
        id: 3,
        text: "What's your estimated daily travel budget per person?",
        options: ["~ 100$", "100$ ~ 200$", "200$ ~ 300$", "300$ ~"],
        imgs: [m1, m2, m3, m4]
        },
        {
        id: 4,
        text: "When are you planning to visit?",
        options: ["Spring", "Summer", "Autumn", "Winter"],
        imgs: [s1, s2, s3, s4]
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    // 답변 저장
    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        setUserAnswers((userAnswers) => {
            let newAnswers = { ...userAnswers };
            newAnswers[currentQuestion] = selectedOption;
            return newAnswers;
        });
    };

    // 이전 질문으로 이동
    const q_prev = () => {
        if(currentQuestion > 0)
        setCurrentQuestion(currentQuestion-1)
    }

    // 다음 질문으로 이동
    const q_next = () => {
        if(!userAnswers[currentQuestion]){
            Swal.fire({ 
                text: 'Please answer the question!',
                color: '#00000080' ,
                icon: 'warning',
                iconColor: '#ffc600',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ffc600',
                background: '#ffffff'
            })
        }else if(currentQuestion < 3)
        setCurrentQuestion(currentQuestion+1)
    }

    // 답변 완료 후 제출
    const submit = () => {
        if(!userAnswers[3]){
            Swal.fire({ 
                text: 'Please answer the question!',
                color: '#00000080' ,
                icon: 'warning',
                iconColor: '#ffc600',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ffc600',
                background: '#ffffff'
            })
        }
        else{
            const result = {
                question1: userAnswers[0],
                question2: userAnswers[1],
                question3: userAnswers[2],
                question4: userAnswers[3]
            }
            navigate('/result',{state: {result}})
        }
    }

    return(
        <div className='questionboard'>
            <p className='qTitle'>{questions[currentQuestion].text}</p>
            <form>
                <div className='qImgs'>
                {questions[currentQuestion].imgs.map((img, index) => (
                    <img className='qImg' key={index} src={img} alt='images' />
                ))}
                </div>
                <div className='qDiv'>
                {questions[currentQuestion].options.map((option, index) => (
                <label className='qText' key={index} title={option}>
                    <input 
                    className='qRadio'
                    type="radio"
                    value={option}
                    checked={userAnswers[currentQuestion] === option}
                    onChange={handleOptionChange}
                    />
                    {option}
                </label>
                ))}
                </div>
            </form>
            <div className='qBtn'>
            {
            currentQuestion !==0 && <img className='btns' src={pre} onClick={q_prev} alt='previous'/>
            }
            {
            currentQuestion !==3 && <img className='btns' src={next} onClick={q_next} alt='next' />
            }
            {
            currentQuestion ===3 && <img className='btns' src={sub} onClick={submit} alt='submit' />
            }
            </div>
            <div id='ifooter'>
                <a target="_blank" rel="noreferrer" href="https://icons8.com/illustrations/illustration/64ee064c17578600014fd1bc">App</a> icon by <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a>
            </div>
        </div>
    )
}

export default Question;