document.addEventListener('DOMContentLoaded', ()=> {

    /* Déclarations */
    const APIURL = 'https://60d0629b7de0b200171087c0.mockapi.io/';
    const searchData = document.querySelector('#searchData');
    const dataForm = document.querySelector('#dataForm');
    const steps = document.querySelectorAll('.step');
    /* Fonctions */

    const nextStep = () => {
        console.log(steps);
        for(let step of steps){
            let next = step.querySelector('.next');
            if(next != null){
                next.addEventListener('click', (event) => {
                    event.preventDefault();
                    next.parentNode.classList.remove('visible');
                    next.parentNode.nextElementSibling.classList.add('visible');
                });
            } 
        }
    }

    const userSubmit = () => {
        dataForm.addEventListener('submit', (event)=>{
            // Stop event Propagation
            event.preventDefault();
            // Check form data
            const city = document.querySelector('[name="city"]').value;
            const spot = document.querySelector('[name="spot"]').value;
            const waterman = document.querySelector('[name="waterman"]').value;
            const date = document.querySelector('[name="date"]').value;
            const startHour = document.querySelector('[name="startHour"]').value;
            const endHour = document.querySelector('[name="endHour"]').value;
            const waterColor = document.querySelector('[name="waterColor"]:checked').value;
            const waterWaste = document.querySelector('[name="waterWaste"]:checked').value;
            const habits = document.querySelectorAll('[name="habits"]:checked');
            const attendanceBathers = document.querySelector('[name="attendanceBathers"]:checked').value;
            const attendanceAthletic = document.querySelector('[name="attendanceAthletic"]:checked').value;
            const attendanceBoats = document.querySelectorAll('[name="attendanceBoat"]:checked');
            const note = document.querySelector('[name="note"]').value;
            let habitsDatas = [];
            let boatsDatas= [];
            for( let i = 0; i < habits.length ; i++){
                    habitsDatas.push(habits[i].value);
            }
            for( let i = 0; i < attendanceBoats.length ; i++){
                let number = attendanceBoats[i].nextElementSibling.querySelector('input:checked').value;
                boatsDatas.push(
                    {
                        "name": attendanceBoats[i].value,
                        "number": number
                    }
                );
            }

            console.log(habitsDatas, boatsDatas)

            let datas = {
                "city": city,
                "spot": spot,
                "user": waterman,
                "date" : date,
                "startHour": startHour,
                "endHour": endHour,
                "waterColor": waterColor,
                "habits": habitsDatas,
                "attendanceBathers": attendanceBathers,
                "waterWaste": waterWaste,
                "attendanceAthletic": attendanceAthletic,
                "attendanceBoat": boatsDatas,
                "note": note
            }
            console.log(JSON.stringify(datas));
            fetch(`${APIURL}data`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datas)
              }).then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err));
        });
    };

    userSubmit();
    nextStep();
});
