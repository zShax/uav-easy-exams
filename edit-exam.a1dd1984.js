let e=[];function t(){const e=new Date,t=new Date(examData.endTime);if(e<t){const n=t-e,s=Math.floor(n/1e3%60),a=Math.floor(n/1e3/60%60),i=Math.floor(n/1e3/3600%24),d=Math.floor(n/864e5);document.getElementById("remainingTime").innerText=`Remaining Time: ${d} days, ${i} hours, ${a} minutes, ${s} seconds`}else{document.getElementById("remainingTime").innerText="The end date has already passed."}}document.addEventListener("DOMContentLoaded",(()=>{fetch(`http://16.16.137.163:5000/api/exam/${localStorage.getItem("Id")}`,{method:"GET"}).then((e=>e.json())).then((t=>function(t){const n=document.createDocumentFragment(),s=document.getElementById("formExam"),a=document.createElement("input");a.setAttribute("type","submit");for(let a=0;a<t.exercises.length;a++){const i=t.exercises[a].question,d=t.exercises[a].answers,r=document.createElement("fieldset");let o=document.createElement("legend");o.innerText=i,n.appendChild(o),r.setAttribute("id",`question${a+1}`);let l=[];for(let e=0;e<t.exercises[a].answers.length;e++){let t=document.createElement("input");t.setAttribute("id",`q${a+1}a${e+1}`),t.setAttribute("type","radio"),t.setAttribute("name",`q${a}`);let s=document.createElement("label");s.setAttribute("for",`q${a+1}a${e+1}`),s.innerText=d[e].answer,answerId=d[e].id,n.appendChild(t),n.appendChild(s),l.push({input:t,label:s,answerId:answerId})}e.push(l),s.appendChild(r).appendChild(n)}s.appendChild(a)}(t)))})),document.getElementById("formExam").addEventListener("submit",(t=>{t.preventDefault();const n=[],s=[];for(let t=0;t<exam.exercises.length;t++){s.push(exam.exercises[t].id);const a=e[t].find((e=>!0===e.input.checked));a?n.push(a.answerId):n.push(exam.exercises[t].answers[0].id)}const a={questions:[],answers:[]};for(let e=0;e<s.length;e++)a.questions.push(s[e]),a.answers.push(n[e]);console.dir(a)})),t(),setInterval(t,1e3);
//# sourceMappingURL=edit-exam.a1dd1984.js.map