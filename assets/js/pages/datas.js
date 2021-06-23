document.addEventListener('DOMContentLoaded', ()=> {

    /* Déclarations */
    const APIURL = 'https://60d0629b7de0b200171087c0.mockapi.io/';
    const searchData = document.querySelector('#searchData');
    const dataForm = document.querySelector('#dataForm');
    const steps = document.querySelectorAll('.step');
    const bathers = document.querySelectorAll('[name="attendanceBathers"]');
    const athletic = document.querySelectorAll('[name="attendanceAthletic"]');
    const angling = document.querySelectorAll('[name="attendanceBoatAngling"]');
    const hobbies = document.querySelectorAll('[name="attendanceBoatsHobbies"]');
    const sailing = document.querySelectorAll('[name="attendanceBoatSailing"]');
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

    const ProgressBar = (items) => {
        for(let item of items){
            item.addEventListener('click', (event) => {
                let progress =  item.parentNode.parentNode.querySelector('.progress');
                let img = progress.querySelector('img');
                let barCursor = progress.querySelector('.filled');
                if(item.value === "≤ 5"){
                    img.classList.remove('one');
                   img.classList.remove('two');
                   img.classList.remove('three');
                   img.classList.add('zero');
                   barCursor.classList.remove('one');
                   barCursor.classList.remove('two');
                   barCursor.classList.remove('three');
                   barCursor.classList.add('zero');
                }
                else if(item.value === "5 à 20"){
                    img.classList.add('one');
                   img.classList.remove('two');
                   img.classList.remove('three');
                   img.classList.remove('zero');
                   barCursor.classList.add('one');
                   barCursor.classList.remove('two');
                   barCursor.classList.remove('three');
                   barCursor.classList.remove('zero');

                }else if(item.value === "20 à 50"){
                    img.classList.remove('one');
                   img.classList.add('two');
                   img.classList.remove('three');
                   img.classList.remove('zero');
                   barCursor.classList.remove('one');
                   barCursor.classList.add('two');
                   barCursor.classList.remove('three');
                   barCursor.classList.remove('zero');

                }else if(item.value === "≥ 50"){
                    img.classList.remove('one');
                    img.classList.remove('two');
                    img.classList.add('three');
                    img.classList.remove('zero');
                    barCursor.classList.remove('one');
                    barCursor.classList.remove('two');
                    barCursor.classList.add('three');
                    barCursor.classList.remove('zero');
                }else if(item.value === "≥ 2"){
                    img.classList.remove('one');
                    img.classList.add('two');
                    barCursor.classList.remove('one');
                    barCursor.classList.add('two');
                }else if(item.value === "0 à 1"){
                    img.classList.add('one');
                    img.classList.remove('two');
                    barCursor.classList.add('one');
                    barCursor.classList.remove('two');
                }
            })
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
                .then(res => {
                    console.log(res);
                    location.reload();
                })
                .catch(err => console.log(err));
        });
    };

    userSubmit();
    nextStep();
    ProgressBar(bathers);
    ProgressBar(athletic);
    ProgressBar(angling);
    ProgressBar(hobbies);
    ProgressBar(sailing);
});
