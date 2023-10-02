import './PopularCards.css'

import hovenier from '../../assets/hovenier.png'
import loodgieter from '../../assets/loodgieter.png'
import elektricien from '../../assets/lamp.png'
import dakdekker from '../../assets/dakdekker.png'

function PopularCards() {

const PopularCardsData = [
    {
        name: 'Hovenier',
        icon: hovenier,
    },
    {
        name: 'Elektriciën',
        icon: elektricien,
    },
    {
        name: 'Loodgieter',
        icon: loodgieter,
    },
    {
        name: 'Dakdekker',
        icon: dakdekker,
    },
    {
        name: 'Schoonmaken',
        icon: hovenier,
    },
    {
        name: 'Aannemer',
        icon: hovenier,
    },
];

let popularCardsToBeRendered = PopularCardsData.map((Popularcard) => {
   return(
        <>
            <div className='popularcard'>
                <img src={Popularcard.icon} alt={Popularcard.name} />
                <div>{Popularcard.name}</div>
            </div>   
        </>
        
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