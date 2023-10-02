import './PopularCards.css'

import hovenier from '../../assets/hovenier.png'
import loodgieter from '../../assets/loodgieter.png'
import elektricien from '../../assets/lamp.png'
import dakdekker from '../../assets/dakdekker.png'

function PopularCards() {

const PopularCardsData = [
    {
        id: 1,
        name: 'Hovenier',
        icon: hovenier,
    },
    {
        id: 2,
        name: 'Elektriciën',
        icon: elektricien,
    },
    {
        id: 3,
        name: 'Loodgieter',
        icon: loodgieter,
    },
    {
        id: 4,
        name: 'Dakdekker',
        icon: dakdekker,
    },
    {
        id: 5,
        name: 'Schoonmaken',
        icon: hovenier,
    },
    {
        id: 6,
        name: 'Aannemer',
        icon: hovenier,
    },
];

let popularCardsToBeRendered = PopularCardsData.map(Popularcard => {
   return(     
        <div key={Popularcard.id} className='popularcard'>
            <img src={Popularcard.icon} alt={Popularcard.name} />
            <div>{Popularcard.name}</div>
        </div>   
   )
})

  return (
    <>
        <div className="popularCard-section">
            <div className='popularCard-container'>
                {popularCardsToBeRendered}
            </div>    
        </div>
        
    </>   
  )
}

export default PopularCards