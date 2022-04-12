import React from 'react';
// import { useNavigate } from 'react-router-dom';

function QuizNew () {
  // const navigate = useNavigate();
  // const [name, setName] = React.useState('');
  // const token = localStorage.getItem('token');
  // React.useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   }
  // });

  // const createQuiz = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5005/admin/quiz/new', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ name }),
  //     });
  //     if (response.status === 400) {
  //       console.log(await response.text());
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return <>
    <h1>QuizNew</h1>
    {/* Quiz name: <input type="text" onChange={e => setName(e.target.value)} />
    <button onClick={createQuiz}>Create</button> */}
  </>;
}

export default QuizNew;
