import './WinWindow.css';

interface WinWindowProps {
    finalScore: string | null;
    wishes?: string[]; // Опціональний масив текстових побажань
}

const realWishes = [
    "Здавай лаби вчасно, ти зробиш велику послугу майбутньому собі!",
    "Не потрібно зубрити все, хватає лише робити вигляд, що ти шариш!",
    "Молитва перед екзаменом дійсно працює!",
    "Мати багато друзів завжди вигідно - вони можуть кидати готові лаби!",
    "Щоб не сталось, пам'ятай - сон завжди важливіше!",
    "Хто навчався в політесі - той в цирку не сміється!"
];

function getRandomWish(wishes: string[]) {
    const randomIndex = Math.floor(Math.random() * wishes.length);
    return wishes[randomIndex];
}

function WinWindow({ finalScore, wishes = realWishes }: WinWindowProps) {
    const randomWish = getRandomWish(wishes);

    return (
        <div className="app">
            <div className='container'>
                <div className="win-window">
                    <h2>Вітаємо!</h2>
                    <p>Твій фінальний бал: {finalScore}</p>

                    <div className="wishes">
                        <h3>Пам'ятай:</h3>
                        <p>{randomWish}</p>
                    </div>
                </div>
            </div>
            <div className='feedback'>Contact dev <a href='https://t.me/lpnu_timetable'>@lpnu_timetable</a></div>
        </div>
    );
}

export default WinWindow;
