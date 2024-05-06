import './PopularCards.css'

import YardIcon from '@mui/icons-material/Yard';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RoofingIcon from '@mui/icons-material/Roofing';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

function PopularCards() {

const PopularCardsData = [
    {
        id: 1,
        name: 'Hovenier',
        icon: <YardIcon />,
    },
    {
        id: 2,
        name: 'Elektriciën',
        icon: <ElectricBoltIcon />,
    },
    {
        id: 3,
        name: 'Loodgieter',
        icon: <PlumbingIcon />,
    },
    {
        id: 4,
        name: 'Dakdekker',
        icon: <RoofingIcon />,
    },
    {
        id: 5,
        name: 'Schoonmaken',
        icon: <CleaningServicesIcon/>,
    },
];

let popularCardsToBeRendered = PopularCardsData.map(Popularcard => {
   return(     
        <div key={Popularcard.id} className='popularcard'>
            {Popularcard.icon}
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