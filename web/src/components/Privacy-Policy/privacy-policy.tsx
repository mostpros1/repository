import "./privacy-policy.css"
import privacylockpic from "../../assets/locked_icon_dude.svg"

function PrivacyPolicy() {
    return (
        <main id="privacy-policyMain">
            <section id="privacypolicyUpperSection">
                <h1>Privacy beleid van MostPros</h1>
                <img src={privacylockpic} alt="Privacy Lock" />
            </section>

            <section id="privacypolicyLowerSection">
                
                <p>Versie: 1.2 Laatst aangepaste datum: 28 - 08 - 2023</p>

                <p>
                    Wij zijn er van bewust dat je vertrouwen stelt in ons. Wij zien het dan ook als onze ver­ant­woor­de­lijk­heid om jouw privacy te beschermen. Op deze pagina laten we je weten welke gegevens we verzamelen als je onze website gebruikt,
                    waarom we deze gegevens verzamelen en hoe we hiermee jouw ge­bruik­s­er­va­ring verbeteren. Zo snap je precies hoe wij werken.
                    Dit pri­va­cy­be­leid is van toepassing op de diensten van Mostpros. Je dient je ervan bewust te zijn dat Mostpros niet ver­ant­woor­de­lijk is voor het pri­va­cy­be­leid van andere sites en bronnen. Door gebruik te maken van deze website geef je aan het pri­va­cy­be­leid te accepteren.
                    Mostpros res­pec­teert de privacy van alle gebruikers van haar site en draagt er zorg voor dat de per­soon­lij­ke informatie die je ons verschaft ver­trou­we­lijk wordt behandeld.
                </p>

            </section>
        </main>
    )
}

export default PrivacyPolicy