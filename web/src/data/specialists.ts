const specialists = [
    {
        id: 1,
        name: "Loodgieter",
        tasks: [
            { task: "Lekkende Kranen/Leidingen Reparatie", link: "/lekkages-repareren" },
            { task: "Sanitair Installatie/Vervanging", link: "/sanitair-installeren" },
            { task: "Afvoer Ontstopping", link: "/afvoer-ontstopping" },
            { task: "Boiler/Geiser Onderhoud", link: "/boiler-geiser-nderhoud" },
            { task: "Verwarmingssysteem Reparatie/Installatie", link: "/verwarmingssysteem-reparatie-installatie" },
        ]
    },
    {
        id: 2,
        name: "Hovenier",
        tasks: [
            { task: "Tuinontwerp maken", link: "/tuinontwerp-maken" },
            { task: "Planten verzorgen", link: "/planten-verzorgen" },

            { task: "Tuinaanleg", link: "/tuinaanleg" },
            { task: "Tuinonderhoud (Snoeien, Bemesten, Onkruid)", link: "/tuinonderhoud" },
            { task: "Bomen/Struiken/Planten Planten", link: "/planten-planten" },
            { task: "Gazons Aanleggen (Zaaien/Graszoden)", link: "/gazons-aanleggen" },
            { task: "Bewateringssystemen Installeren", link: "/bewateringssystemen-installeren" },
        ]
    },
    {
        id: 3,
        name: "Elektriciën",
        tasks: [
            { task: "Elektrische bedrading repareren", link: "/elektrische-bedrading-repareren" },
            { task: "Stopcontacten installeren", link: "/stopcontacten-installeren" },

            { task: "Nieuwe Elektrische Bedrading Installatie", link: "/nieuwe-elektrische-bedrading-installatie" },
            { task: "Elektrische Systeem Reparatie", link: "/elektrische-systeem-reparatie" },
            { task: "Elektrische Onderhoud", link: "/elektrische-olnderhoud" },
            { task: "Groepenkast Werkzaamheden", link: "/groepenkast-werkzaamheden" },
            { task: "Verlichtingsarmaturen Werkzaamheden", link: "/verlichtingsarmaturen-werkzaamheden" },
        ]
    },
    {
        id: 4,
        name: "Dakdekker",
        tasks: [
            { task: "Dakreparaties uitvoeren", link: "/dakreparaties-uitvoeren" },
            { task: "Dakbedekking vervangen", link: "/dakbedekking-vervangen" },

            { task: "Nieuwe Daken Plaatsen", link: "/nieuwe-daken-plaatsen" },
            { task: "Oude Daken Vervangen", link: "/oude-daken-vervangen" },
            { task: "Beschadigde Daken Repareren", link: "/beschadigde-daken-repareren" },
            { task: "Dakisolatie Installeren", link: "/dakisolatie-installeren" },
            { task: "Dakbedekking Aanbrengen", link: "/dakbedekking-aanbrengen" },
        ]
    },
    {
        id: 5,
        name: "Schoonmaker",
        tasks: [
            { task: "Schoonmaken van woningen", link: "/schoonmaken-van-woningen" },
            { task: "Ramen wassen", link: "/ramen-wassen" },

            { task: "Vloeren/Tapijten Stofzuigen", link: "/vloeren-tapijten-stofzuigen" },
            { task: "Vloeren Dweilen", link: "/vloeren-dweilen" },
            { task: "Meubels/Oppervlakken Afstoffen", link: "/meubels-oppervlakken-afstoffen" },
            { task: "Ramen/Spiegels Reinigen", link: "/ramen-spiegels-reinigen" },
            { task: "Prullenbakken Legen/Vervangen", link: "/prullenbakken-legen-vervangen" },
        ]
    },
    {
        id: 6,
        name: "Interieuradviseur",
        tasks: [
            { task: "Ruimte-indeling advies", link: "/ruimte-indeling" },
            { task: "Kleuradvies muren/meubels", link: "/kleuradvies" },
            { task: "Meubel/decor selectie", link: "/meubel-selectie" },
            { task: "Maatwerk meubeldesign", link: "/maatwerk-meubeldesign" },
            { task: "Raambekleding keuze", link: "/raambekleding" },
        ]
    },
    {
        id: 7,
        name: "Timmerman",
        tasks: [
            { task: "Kasten/rekken bouwen & installeren", link: "/kastenrekken-bouwen-installeren" },
            { task: "Deuren/ramen vervaardigen & plaatsen", link: "/deuren-ramen-vervaardigen-plaatsen" },
            { task: "Houten vloeren leggen", link: "/houten-vloeren-leggen" },
            { task: "Plinten/lijstwerk installeren", link: "/plinten-lijstwerk-installeren" },
            { task: "Trappen/balustrades bouwen", link: "/trappen-balustrades-bouwen" },
        ]
    },
    {
        id: 7,
        name: "Interieurschilder",
        tasks: [
            { task: "Muren/plafonds schilderen", link: "/muren-plafonds-schilderen" },
            { task: "Oppervlakken voorbereiden", link: "/oppervlakken-voorbereiden" },
            { task: "Houtwerk behandelen", link: "/houtwerk-behandelen" },
            { task: "Grondverf/primer aanbrengen", link: "/grondverf-primer-aanbrengen" },
            { task: "Lakken", link: "/lakken" },
        ]
    },
    {
        id: 8,
        name: "Behanger",
        tasks: [
            { task: "Oud behang verwijderen", link: "/oud-behang-verwijderen" },
            { task: "Muurvoorbereiding", link: "/muurvoorbereiding" },
            { task: "Voorstrijk/primer aanbrengen", link: "/voorstrijk-primer-aanbrengen" },
            { task: "Behangrollen knippen/meten", link: "/behangrollen-knippen-meten" },
            { task: "Behanglijm aanbrengen", link: "/behanglijm-aanbrengen" },
        ]
    },
    {
        id: 9,
        name: "Keukenmonteur",
        tasks: [
            { task: "Oude keuken demontage & afvoer", link: "/oude-keuken-demontage-afvoer" },
            { task: "Leidingwerk voorbereiding", link: "/leidingwerk-voorbereiding" },
            { task: "Keukenkasten/elementen plaatsing", link: "/keukenkasten-elementen-plaatsing" },
            { task: "Keukenapparatuur montage", link: "/keukenapparatuur-montage" },
            { task: "Werkbladen aanbrengen", link: "/werkbladen-aanbrengen" },
        ]
    },
    {
        id: 10,
        name: "Tegelzetter",
        tasks: [
            { task: "Ondergronden voorbereiden", link: "/ondergronden-voorbereiden" },
            { task: "Tegellijm aanbrengen", link: "/tegellijm-aanbrengen" },
            { task: "Wand-/vloertegels plaatsen", link: "/wand-vloertegels-plaatsen" },
            { task: "Tegels snijden/op maat maken", link: "/tegels-snijden-op-maat-maken" },
            { task: "Tegelwerk voegen", link: "/tegelwerk-voegen" },
        ]
    },
    {
        id: 11,
        name: "Badkamerspecialist",
        tasks: [
            { task: "Badkamerontwerp", link: "/badkamerontwerp" },
            { task: "Sanitair/tegels/inrichting advies", link: "/sanitair-tegels-inrichting-advies" },
            { task: "Douches/baden/wastafels/toiletten installatie", link: "/douches-baden-wastafels-toiletten-installatie" },
            { task: "Waterleidingen/afvoeren aanleggen", link: "/waterleidingen-afvoeren-aanleggen" },
            { task: "Badkamermeubels/-kasten plaatsen", link: "/badkamermeubels-kasten-plaatsen" },
        ]
    },
    {
        id: 12,
        name: "Stukadoor",
        tasks: [
            { task: "Pleisterwerk aanbrengen", link: "/pleisterwerk-aanbrengen" },
            { task: "Oppervlakken glad maken/afwerken", link: "/oppervlakken-glad-maken-afwerken" },
            { task: "Beschadigde muren/plafonds herstellen", link: "/beschadigde-muren-plafonds-herstellen" },
            { task: "Sierpleister aanbrengen", link: "/sierpleister-aanbrengen" },
            { task: "Decoratieve afwerkingen", link: "/decoratieve-afwerkingen" },
        ]
    },
    {
        id: 13,
        name: "Verwarmingsinstallateur",
        tasks: [
            { task: "Cv-ketels/combiketels installatie", link: "/cv-ketels-combiketels-installatie" },
            { task: "Radiatoren/convectoren plaatsing", link: "/radiatoren-convectoren-plaatsing" },
            { task: "Vloerverwarmingssystemen aanleggen", link: "/vloerverwarmingssystemen-aanleggen" },
            { task: "Warmtepompen/zonneboilers installeren", link: "/warmtepompen-zonneboilers-installeren" },
            { task: "Verwarmingsinstallaties onderhoud/reparatie", link: "/verwarmingsinstallaties-onderhoud-reparatie" },
        ]
    },
    {
        id: 14,
        name: "Stoffeerder",
        tasks: [
            { task: "Tapijt leggen", link: "/tapijt-leggen" },
            { task: "Vinyl/linoleum/pvc vloeren installeren", link: "/vinyl-linoleum-pvc-vloeren-installeren" },
            { task: "Trapbekleding aanbrengen", link: "/trapbekleding-aanbrengen" },
            { task: "Bestaande vloerbedekking herstellen/renoveren", link: "/bestaande-vloerbedekking-herstellen-renoveren" },
            { task: "Ondervloeren plaatsen/vloeren egaliseren", link: "/ondervloeren-plaatsen-vloeren-egaliseren" },
        ]
    },
    {
        id: 15,
        name: "Aannemer",
        tasks: [
            { task: "Bouwprojecten coördinatie & beheer", link: "/bouwprojecten-coordinatie-en-beheer" },
            { task: "Begroting & offerte opstellen", link: "/begroting-en-offerte-opstellen" },
            { task: "Onderaannemers/vaklieden inhuren & aansturen", link: "/onderaannemers-vaklieden-inhuren-en-aansturen" },
            { task: "Projectplanning & voortgang bewaken", link: "/projectplanning-en-voortgang-bewaken" },
            { task: "Kwaliteit & veiligheid garanderen", link: "/kwaliteit-en-veiligheid-garanderen" },
        ]
    },
    {
        id: 16,
        name: "Exterieur schilder",
        tasks: [
            { task: "Buitenmuren/gevels schilderen", link: "/buitenmuren-gevels-schilderen" },
            { task: "Kozijnen/deuren/luiken schilderen", link: "/kozijnen-deuren-luiken-schilderen" },
            { task: "Houtwerk behandelen", link: "/houtwerk-behandelen" },
            { task: "Grondverf/primer aanbrengen", link: "/grondverf-primer-aanbrengen" },
            { task: "Beschadigde/verouderde verflagen herstellen", link: "/beschadigde-verouderde-verflagen-herstellen" },
        ]
    },
    {
        id: 17,
        name: "Gevelspecialist",
        tasks: [
            { task: "Gevels reinigen", link: "/gevels-reinigen" },
            { task: "Metselwerk voegen/hervoegen", link: "/metselwerk-voegen-hervoegen" },
            { task: "Gevelschade repareren", link: "/gevelschade-repareren" },
            { task: "Gevels zandstralen/chemisch reinigen", link: "/gevels-zandstralen-chemisch-reinigen" },
            { task: "Gevels impregneren", link: "/gevels-impregneren" },
        ]
    },
    {
        id: 18,
        name: "Isolatiespecialist",
        tasks: [
            { task: "Dakisolatie", link: "/dakisolatie" },
            { task: "Vloerisolatie aanbrengen", link: "/vloerisolatie-aanbrengen" },
            { task: "Muur/gevelisolatie", link: "/muur-gevelisolatie" },
            { task: "Spouwmuurisolatie installeren", link: "/spouwmuurisolatie-installeren" },
            { task: "Kruipruimte-isolatie", link: "/kruipruimte-isolatie" },
        ]
    },
    {
        id: 19,
        name: "Metselaar",
        tasks: [
            { task: "Binnen-/buitenmuren optrekken", link: "/binnen-buitenmuren-optrekken" },
            { task: "Historisch metselwerk restaureren", link: "/historisch-metselwerk-restaureren" },
            { task: "Voegwerkzaamheden", link: "/voegwerkzaamheden" },
            { task: "Bestaand metselwerk repareren", link: "/bestaand-metselwerk-repareren" },
            { task: "Siermetselwerk plaatsen", link: "/siermetselwerk-plaatsen" },
        ]
    },
    {
        id: 20,
        name: "Glaszetter",
        tasks: [
            { task: "Nieuw glas in ramen/deuren plaatsen", link: "/nieuw-glas-in-ramen-deuren-plaatsen" },
            { task: "Gebroken/beschadigd glas vervangen", link: "/gebroken-beschadigd-glas-vervangen" },
            { task: "Isolerend dubbelglas/hr++ glas installeren", link: "/isolerend-dubbelglas-hr-glas-installeren" },
            { task: "Veiligheidsglas/inbraakwerend glas plaatsen", link: "/veiligheidsglas-inbraakwerend-glas-plaatsen" },
            { task: "Glazen deuren/scheidingswanden installeren", link: "/glazen-deuren-scheidingswanden-installeren" },
        ]
    },
    {
        id: 21,
        name: "Kozijnspecialist",
        tasks: [
            { task: "Nieuwe kozijnen installeren", link: "/nieuwe-kozijnen-installeren" },
            { task: "Oude/beschadigde kozijnen vervangen", link: "/oude-beschadigde-kozijnen-vervangen" },
            { task: "Beschadigde kozijnen repareren", link: "/beschadigde-kozijnen-repareren" },
            { task: "Isolatie bij kozijnen aanbrengen", link: "/isolatie-bij-kozijnen-aanbrengen" },
            { task: "Raam-/deurkozijnen plaatsen", link: "/raam-deurkozijnen-plaatsen" },
        ]
    },
    {
        id: 22,
        name: "Schoorsteenveger",
        tasks: [
            { task: "Schoorsteenkanalen reinigen", link: "/schoorsteenkanalen-reinigen" },
            { task: "Roet/vogelnesten/obstructies verwijderen", link: "/roet-vogelnesten-obstructies-verwijderen" },
            { task: "Schoorsteen inspectie", link: "/schoorsteen-inspectie" },
            { task: "Rooktesten", link: "/rooktesten" },
            { task: "Schoorsteenkapjes/vonkenvangers plaatsing", link: "/schoorsteenkapjes-vonkenvangers-plaatsing" },
        ]
    },
    {
        id: 23,
        name: "Laadpaalspecialist",
        tasks: [
            { task: "Laadpaal type advies", link: "/laadpaal-type-advies" },
            { task: "Elektrische voertuig laadpalen installatie", link: "/elektrische-voertuig-laadpalen-installatie" },
            { task: "Laadpalen onderhoud/reparatie", link: "/laadpalen-onderhoud-reparatie" },
            { task: "Bestaande laadinfrastructuur upgraden", link: "/bestaande-laadinfrastructuur-upgraden" },
            { task: "Stroomcapaciteit analyse", link: "/stroomcapaciteit-analyse" },
        ]
    },
    {
        id: 24,
        name: "Zonnepaneel specialist",
        tasks: [
            { task: "Zonnepanelen type/aantal advies", link: "/zonnepanelen-type-aantal-advies" },
            { task: "Zonnepaneelinstallaties ontwerp", link: "/zonnepaneelinstallaties-ontwerp" },
            { task: "Zonnepanelen installatie", link: "/zonnepanelen-installatie" },
            { task: "Zonnepanelen aansluiting elektriciteitsnet", link: "/zonnepanelen-aansluiting-elektriciteitsnet" },
            { task: "Omvormers installatie/configuratie", link: "/omvormers-installatie-configuratie" },
        ]
    },
    {
        id: 25,
        name: "Beveiligingsspecialist",
        tasks: [
            { task: "Beveiligingsadvies", link: "/beveiligingsadvies" },
            { task: "Alarmsystemen installatie", link: "/alarmsystemen-installatie" },
            { task: "Camerasystemen installatie", link: "/camerasystemen-installatie" },
            { task: "Toegangscontrolesystemen installatie", link: "/toegangscontrolesystemen-installatie" },
            { task: "Brandbeveiliging/rookmelders installatie", link: "/brandbeveiliging-rookmelders-installatie" },
        ]
    },
    {
        id: 26,
        name: "Toegangsspecialist",
        tasks: [
            { task: "Toegangscontrolesystemen installatie", link: "/toegangscontrolesystemen-installatie" },
            { task: "Keycard-/badgesystemen programmeren", link: "/keycard-badgesystemen-programmeren" },
            { task: "Biometrische toegangssystemen installatie", link: "/biometrische-toegangssystemen-installatie" },
            { task: "Automatische deuren/poorten advies/installatie", link: "/automatische-deuren-poorten-advies-installatie" },
            { task: "Slagbomen/tourniquets plaatsing/onderhoud", link: "/slagbomen-tourniquets-plaatsing-onderhoud" },
        ]
    },
    {
        id: 27,
        name: "Tuinontwerper",
        tasks: [
            { task: "Tuinontwerpen/beplantingsplannen maken", link: "/tuinontwerpen-beplantingsplannen-maken" },
            { task: "Tuinindeling/plantenkeuze advies", link: "/tuinindeling-plantenkeuze-advies" },
            { task: "Tuintekeningen/3d-visualisaties opstellen", link: "/tuintekeningen-3d-visualisaties-opstellen" },
            { task: "Bodemanalyse/bodemverbetering advies", link: "/bodemanalyse-bodemverbetering-advies" },
            { task: "Waterpartijen integratie", link: "/waterpartijen-integratie" },
        ]
    },
    {
        id: 28,
        name: "Stratenmaker",
        tasks: [
            { task: "Opritten aanleggen", link: "/opritten-aanleggen" },
            { task: "Terrassen leggen", link: "/terrassen-leggen" },
            { task: "Tuinpaden aanleggen", link: "/tuinpaden-aanleggen" },
            { task: "Trottoirs/stoepen plaatsen", link: "/trottoirs-stoepen-plaatsen" },
            { task: "Sierbestrating leggen", link: "/sierbestrating-leggen" },
        ]
    },
    {
        id: 29,
        name: "Tuintechnicus",
        tasks: [
            { task: "Tuinverlichting installeren", link: "/tuinverlichting-installeren" },
            { task: "Irrigatie-/druppelsystemen aanleggen", link: "/irrigatie-druppelsystemen-aanleggen" },
            { task: "Vijverpompen/-filters installatie", link: "/vijverpompen-filters-installatie" },
            { task: "Fonteinen/waterpartijen plaatsen/onderhoud", link: "/fonteinen-waterpartijen-plaatsen-onderhoud" },
            { task: "Tuinberegeningssystemen installeren", link: "/tuinberegeningssystemen-installeren" },
        ]
    },
    {
        id: 30,
        name: "Zwembadinstallateur",
        tasks: [
            { task: "Zwembadontwerp", link: "/zwembadontwerp" },
            { task: "Zwembadlocatie graven/voorbereiden", link: "/zwembadlocatie-graven-voorbereiden" },
            { task: "Inbouwzwembaden installeren", link: "/inbouwzwembaden-installeren" },
            { task: "Bovengrondse zwembaden aanleggen", link: "/bovengrondse-zwembaden-aanleggen" },
            { task: "Zwembadpompen/filters installeren", link: "/zwembadpompen-filters-installeren" },
        ]
    },
    {
        id: 31,
        name: "Smart garden adviseur",
        tasks: [
            { task: "Slimme tuinoplossingen advies", link: "/slimme-tuinoplossingen-advies" },
            { task: "Geautomatiseerde irrigatiesystemen implementeren", link: "/geautomatiseerde-irrigatiesystemen-implementeren" },
            { task: "Slimme tuinverlichting installeren", link: "/slimme-tuinverlichting-installeren" },
            { task: "Slimme weersensoren integreren", link: "/slimme-weersensoren-integreren" },
            { task: "Plantenmonitors/bodemsensoren configureren", link: "/plantenmonitors-bodemsensoren-configureren" },
        ]
    },
    {
        id: 32,
        name: "Verhuizer",
        tasks: [
            { task: "Huishoudelijke artikelen/meubels inpakken", link: "/huishoudelijke-artikelen-meubels-inpakken" },
            { task: "Meubels demonteren", link: "/meubels-demonteren" },
            { task: "Verhuisdozen/meubels laden in verhuiswagen", link: "/verhuisdozen-meubels-laden-in-verhuiswagen" },
            { task: "Inboedel vervoeren naar nieuwe locatie", link: "/inboedel-vervoeren-naar-nieuwe-locatie" },
            { task: "Verhuisdozen/meubels uitladen op nieuwe locatie", link: "/verhuisdozen-meubels-uitladen-op-nieuwe-locatie" },
        ]
    },
    {
        id: 33,
        name: "Slotenmaker",
        tasks: [
            { task: "Deuren openen bij buitensluiting", link: "/deuren-openen-bij-buitensluiting" },
            { task: "Sloten vervangen", link: "/sloten-vervangen" },
            { task: "Nieuwe sloten installeren", link: "/nieuwe-sloten-installeren" },
            { task: "Beschadigde sloten repareren", link: "/beschadigde-sloten-repareren" },
            { task: "Inbraakpreventie advies", link: "/inbraakpreventie-advies" },
        ]
    },
    {
        id: 34,
        name: "Verduurzamingsadviseur",
        tasks: [
            { task: "Huidige energieprestatie analyseren", link: "/huidige-energieprestatie-analyseren" },
            { task: "Energiebesparende maatregelen advies", link: "/energiebesparende-maatregelen-advies" },
            { task: "Verduurzamingsplan opstellen", link: "/verduurzamingsplan-opstellen" },
            { task: "Terugverdientijd duurzame investeringen berekenen", link: "/terugverdientijd-duurzame-investeringen-berekenen" },
            { task: "Isolatietypen voordelen uitleggen", link: "/isolatietypen-voordelen-uitleggen" },
        ]
    },
    {
        id: 35,
        name: "Ongediertebestrijder",
        tasks: [
            { task: "Muizen en ratten bestrijden", link: "/muizen-en-ratten-bestrijden" },
            { task: "Wespennesten verwijderen", link: "/wespennesten-verwijderen" },
            { task: "Bedwantsen bestrijden", link: "/bedwantsen-bestrijden" },
            { task: "Vlooienplagen aanpakken", link: "/vlooienplagen-aanpakken" },
            { task: "Kakkerlakken bestrijden", link: "/kakkerlakken-bestrijden" },
        ]
    },
    {
        id: 36,
        name: "Voertuig monteur",
        tasks: [
            { task: "Onderhoudsbeurten uitvoeren", link: "/onderhoudsbeurten-uitvoeren" },
            { task: "Motor/transmissie reparaties", link: "/motor-transmissie-reparaties" },
            { task: "Olie en filters vervangen", link: "/olie-en-filters-vervangen" },
            { task: "Remmen repareren/vervangen", link: "/remmen-repareren-vervangen" },
            { task: "Wielen uitlijnen/balanceren", link: "/wielen-uitlijnen-balanceren" },
        ]
    },
    {
        id: 37,
        name: "Domotica specialist",
        tasks: [
            { task: "Slimme thermostaten installeren", link: "/slimme-thermostaten-installeren" },
            { task: "Slimme verlichtingssystemen configureren", link: "/slimme-verlichtingssystemen-configureren" },
            { task: "Beveiligingscamera's/-systemen installeren en instellen", link: "/beveiligingscameras-systemen-installeren-en-instellen" },
            { task: "Spraakgestuurde assistenten integreren", link: "/spraakgestuurde-assistenten-integreren" },
            { task: "Gordijnen/zonwering automatiseren", link: "/gordijnen-zonwering-automatiseren" },
        ]
    },
    {
        id: 38,
        name: "Smarthome specialist",
        tasks: [
            { task: "Slimme verlichting installeren", link: "/slimme-verlichting-installeren" },
            { task: "Slimme beveiligingssystemen/camera's opzetten", link: "/slimme-beveiligingssystemen-cameras-opzetten" },
            { task: "Spraakgestuurde assistenten configureren", link: "/spraakgestuurde-assistenten-configureren" },
            { task: "Slimme thermostaten installeren/integreren", link: "/slimme-thermostaten-installeren-integreren" },
            { task: "Slimme deursloten/deurbellen installeren", link: "/slimme-deursloten-deurbellen-installeren" },
        ]
    },
    {
        id: 39,
        name: "AI home adviseur",
        tasks: [
            { task: "Woonbehoeften analyseren voor AI-oplossingen", link: "/woonbehoeften-analyseren-voor-ai-oplossingen" },
            { task: "Advies over AI-gestuurde huishoudelijke apparaten", link: "/advies-over-ai-gestuurde-huishoudelijke-apparaten" },
            { task: "AI-beveiligingssystemen opzetten/configureren", link: "/ai-beveiligingssystemen-opzetten-configureren" },
            { task: "AI-functionaliteiten in smart home systemen integreren", link: "/ai-functionaliteiten-in-smart-home-systemen-integreren" },
            { task: "AI-spraakassistenten installeren/configureren", link: "/ai-spraakassistenten-installeren-configureren" },
        ]
    },
    {
        id: 40,
        name: "Drone piloot",
        tasks: [
            { task: "Luchtfotografie/-videografie", link: "/luchtfotografie-videografie" },
            { task: "Gebouwen/infrastructuur inspectie", link: "/gebouwen-infrastructuur-inspectie" },
            { task: "Landbouw monitoring/gewasinspectie", link: "/landbouw-monitoring-gewasinspectie" },
            { task: "Vastgoedpromotie/-vertoning", link: "/vastgoedpromotie-vertoning" },
            { task: "Inspectie moeilijk bereikbare locaties", link: "/inspectie-moeilijk-bereikbare-locaties" },
        ]
    },
    {
        id: 41,
        name: "Robot adviseur",
        tasks: [
            { task: "Home robot advies/installatie", link: "/home-robot-advies-installatie" },
            { task: "Maairobot advies/installatie", link: "/maairobot-advies-installatie" },
            { task: "Zwembadrobot advies/installatie", link: "/zwembadrobot-advies-installatie" },
            { task: "Robotstofzuiger advies/installatie", link: "/robotstofzuiger-advies-installatie" },
            { task: "Robotramenwasser advies/installatie", link: "/robotramenwasser-advies-installatie" },
        ]
    },
    // Voeg hier meer specialisten toe met hun specifieke taken
];



export default specialists