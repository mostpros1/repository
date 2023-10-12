import kraan from '../../assets/kraan.svg'
import gereedschap from '../../assets/Tools.svg'
import gasleiding from '../../assets/Gasleiding.svg'
import lekkage from '../../assets/Lekkage.svg'
import riolering from '../../assets/Onstoppen.svg'
import anders from '../../assets/Group 234.svg'
import { useState } from 'react'

export function CategoryForm() {

    const repairCategories = [
        {
            id: 1,
            icon: kraan,
            title: "Nieuwe leiding aanleggen",
            category: "pipe replacement",
        },
        {
            id: 2,
            icon: gereedschap,
            title: "Kapotte leiding maken",
            category: "damaged pipes",
        },
        {
            id: 3,
            icon: gasleiding,
            title: "Gasleiding repareren",
            category: "gas pipe repair",
        },
        {
            id: 4,
            icon: lekkage,
            title: "Lekkage verhelpen",
            category: "leakage",
        },
        {
            id: 5,
            icon: riolering,
            title: "Riolering en afvoer onstoppen of reinigen",
            category: "sewage system",
        },
        {
            id: 6,
            icon: anders,
            title: "Anders",
            category: "other",
        },
    ]

    const [isCheckedList, setIsCheckedList] = useState(repairCategories.map(() => false));

    const handleDivClicked = (index: number) => {
    const updatedIsCheckedList = [...isCheckedList];
    updatedIsCheckedList[index] = !updatedIsCheckedList[index];
    setIsCheckedList(updatedIsCheckedList);
  };

  let repairCardsToBeRendered = repairCategories.map((Repaircard, index) => {
    return (
      <div key={Repaircard.id} className='repairCard' onClick={() => handleDivClicked(index)}>
        <input type="checkbox" name={Repaircard.title} value={Repaircard.category} checked={isCheckedList[index]} />
        <img className='icon' src={Repaircard.icon} alt={Repaircard.category} />
        <label>{Repaircard.title}</label>
      </div>
    );
  });

    return (
        <>
            <form className='repaircards-con'>
                {repairCardsToBeRendered}
            </form>
        </>
    )
}