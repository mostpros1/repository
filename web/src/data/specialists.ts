const specialists = [
    {
        id: 1,
        name: "Loodgieter",
        tasks: [
            { task: "Sanitair Installatie/Vervanging", link: "/sanitair-installeren" },
            { task: "Lekkende Kranen/Leidingen Reparatie", link: "/lekkages-repareren" },
            { task: "Afvoer Ontstopping", link: "/lekkages-repareren" },
            { task: "Boiler/Geiser Onderhoud", link: "/lekkages-repareren" },
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
        name: "Elektriciën ",
        tasks: [
            { task: "Elektrische bedrading repareren", link: "/elektrische-bedrading-repareren" },
            { task: "Stopcontacten installeren", link: "/stopcontacten-installeren" },

            { task: "Nieuwe Elektrische Bedrading Installatie", link: "/nieuwe-elektrische-bedrading-installatie" },
            { task: "Elektrische Onderhoud", link: "/elektrische-olnderhoud" },
            { task: "Groepenkast Werkzaamheden", link: "/groepenkast-werkzaamheden" },
            { task: "Verlichtingsarmaturen Werkzaamheden", link: "/verlichtingsarmaturen-werkzaamheden" },
            { task: "Stopcontacten werkzaamheden", link: "/stopcontacten-werkzaamheden" },
            { task: "Elektrische aarding veiligstellen", link: "/elektrische-aarding-veiligstellen" },
            { task: "Elektrische inspecties", link: "/elektrische-inspecties" },
            { task: "Data/communicatiebedrading werkzaamheden", link: "/data-communicatiebedrading-werkzaamheden" },
            { task: "Beveiligingssystemen installatie", link: "/beveiligingssystemen-installatie" },
            { task: "Domotica/smart home installatie", link: "/domotica-smart-home-installatie" },
            { task: "Generatoren/noodstroom installatie", link: "/generatoren-noodstroom-installatie" },
            { task: "Energiezuinige oplossingen advies", link: "/energiezuinige-oplossingen-advies" },
            { task: "Elektrische verwarmingssystemen werkzaamheden", link: "/elektrische-verwarmingssystemen-werkzaamheden" },
            { task: "Ventilatie/airco elektrische aansluitingen", link: "/ventilatie-airco-elektrische-aansluitingen" },
            { task: "Grote elektrische apparaten aansluiting/reparatie", link: "/grote-elektrische-apparaten-aansluiting-reparatie" }
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
            { task: "Dakconstructie/dakbedekking maken", link: "/dakconstructie-dakbedekking-maken" },
            { task: "Buitenconstructies (schuttingen, terrassen, pergola's)", link: "/buitenconstructies-schuttingen-terrassen-pergolas" },
            { task: "Houtstructuren/meubels repareren", link: "/houtstructuren-meubels-repareren" },
            { task: "Maatwerk houten meubels", link: "/maatwerk-houten-meubels" },
            { task: "Houten kozijnen plaatsen/repareren", link: "/houten-kozijnen-plaatsen-repareren" },
            { task: "Renovatie/restauratie werkzaamheden", link: "/renovatie-restauratie-werkzaamheden" },
            { task: "Houten panelen/wandbekleding", link: "/houten-panelen-wandbekleding" },
            { task: "Geluidsisolatie/bouwkundige aanpassingen", link: "/geluidsisolatie-bouwkundige-aanpassingen" },
            { task: "Houten aan/uitbouwen", link: "/houten-aan-uitbouwen" },
            { task: "Overkappingen/carports bouwen", link: "/overkappingen-carports-bouwen" },
            { task: "Tuinhuisjes/schuren/buitenconstructies", link: "/tuinhuisjes-schuren-buitenconstructies" },
            { task: "Samenwerking met andere vakmensen", link: "/samenwerking-met-andere-vakmensen" },
            { task: "Houten gevelbekleding", link: "/houten-gevelbekleding" },
            { task: "Houten speeltoestellen/buitenmeubels maken", link: "/houten-speeltoestellen-buitenmeubels-maken" }
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
            { task: "Keuken schoonmaak (aanrecht, apparaten, vloer)", link: "/keuken-schoonmaak" },
            { task: "Badkamer schoonmaak (toilet, douche, bad, wastafel)", link: "/badkamer-schoonmaak" },
            { task: "Beddengoed verschonen", link: "/beddengoed-verschonen" },
            { task: "Vlekkenbehandeling (vloeren/meubels)", link: "/vlekkenbehandeling-vloeren-meubels" },
            { task: "Oppervlakken desinfecteren", link: "/oppervlakken-desinfecteren" },
            { task: "Buitenruimtes (terrassen/balkons) reinigen", link: "/buitenruimtes-reinigen" },
            { task: "Tapijt stoomreinigen", link: "/tapijt-stoomreinigen" },
            { task: "Opruimen rondslingerende spullen", link: "/opruimen-rondslingerende-spullen" },
            { task: "Meubels/metalen polijsten", link: "/meubels-metalen-polijsten" },
            { task: "Gordijnen/raambekleding reinigen", link: "/gordijnen-raambekleding-reinigen" },
            { task: "Huishoudelijke apparaten schoonmaken", link: "/huishoudelijke-apparaten-schoonmaken" },
            { task: "Schimmel/kalkaanslag verwijderen", link: "/schimmel-kalkaanslag-verwijderen" },
            { task: "Luchtkanalen/ventilatie reinigen", link: "/luchtkanalen-ventilatie-reinigen" },
            { task: "Kinderspeelgoed/speelruimtes desinfecteren", link: "/kinderspeelgoed-speelruimtes-desinfecteren" },
            { task: "Periodieke dieptereiniging/grote schoonmaak", link: "/periodieke-dieptereiniging-grote-schoonmaak" }
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
            { task: "Lichtplan Ontwikkeling", link: "/lichtplan-ontwikkeling" },
            { task: "Materiaalgebruik Advies", link: "/materiaalgebruik-advies" },
            { task: "Renovatie Visualisatie", link: "/renovatie-visualisatie" },
            { task: "Moodboard/Stijlgids Creatie", link: "/moodboard-stijlgids-creatie" },
            { task: "Winkelbezoek Begeleiding", link: "/winkelbezoek-begeleiding" },
            { task: "Renovatie Samenwerking", link: "/renovatie-samenwerking" },
            { task: "Projectmanagement Opvolging", link: "/projectmanagement-opvolging" },
            { task: "Kunstselectie Advies", link: "/kunstselectie-advies" },
            { task: "Technologie Integratie", link: "/technologie-integratie" },
            { task: "Duurzaam Interieuradvies", link: "/duurzaam-interieuradvies" },
            { task: "Toegankelijkheidsadvies", link: "/toegankelijkheidsadvies" }
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
            { task: "Behang gladstrijken (luchtbellen)", link: "/behang-gladstrijken-luchtbellen" },
            { task: "Afwerking hoeken/randen/stopcontacten", link: "/afwerking-hoeken-randen-stopcontacten" },
            { task: "Verschillende behangsoorten", link: "/verschillende-behangsoorten" },
            { task: "Patronen/naden aansluiten", link: "/patronen-naden-aansluiten" },
            { task: "Decoratieve wandbekleding (muurstickers)", link: "/decoratieve-wandbekleding-muurstickers" },
            { task: "Plafonds/schuine wanden behangen", link: "/plafonds-schuine-wanden-behangen" },
            { task: "Behangtype/ontwerp advies", link: "/behangtype-ontwerp-advies" },
            { task: "Kleuren/patronen mengen", link: "/kleuren-patronen-mengen" },
            { task: "Speciale technieken (fotobehang, 3D)", link: "/speciale-technieken-fotobehang-3d" },
            { task: "Muurbeschadigingen herstellen", link: "/muurbeschadigingen-herstellen" },
            { task: "Gereedschap onderhoud", link: "/gereedschap-onderhoud" },
            { task: "Nazorg/behang onderhoudsinstructies", link: "/nazorg-behang-onderhoudsinstructies" },
            { task: "Beschermende coatings over behang", link: "/beschermende-coatings-over-behang" },
            { task: "Periodiek onderhoud/behang vervanging", link: "/periodiek-onderhoud-behang-vervanging" }
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
            { task: "Verzakte bestrating herstellen", link: "/verzakte-bestrating-herstellen" },
            { task: "Kantopsluitingen aanbrengen", link: "/kantopsluitingen-aanbrengen" },
            { task: "Goten/afwateringssystemen plaatsen", link: "/goten-afwateringssystemen-plaatsen" },
            { task: "Parkeerplaatsen/-terreinen leggen", link: "/parkeerplaatsen-terreinen-leggen" },
            { task: "Openbare wegen/pleinen aanleggen", link: "/openbare-wegen-pleinen-aanleggen" },
            { task: "Bestaande bestrating onderhoud", link: "/bestaande-bestrating-onderhoud" },
            { task: "Speelplekken/schoolpleinen aanleggen", link: "/speelplekken-schoolpleinen-aanleggen" },
            { task: "Fiets-/wandelpaden leggen", link: "/fiets-wandelpaden-leggen" },
            { task: "Diverse bestratingsmaterialen toepassen", link: "/diverse-bestratingsmaterialen-toepassen" },
            { task: "Belijning/markeringen aanbrengen", link: "/belijning-markeringen-aanbrengen" },
            { task: "Straatmeubilair plaatsen", link: "/straatmeubilair-plaatsen" },
            { task: "Oude bestrating verwijderen", link: "/oude-bestrating-verwijderen" },
            { task: "Grondwerk voorbereiding voor bestrating", link: "/grondwerk-voorbereiding-voor-bestrating" },
            { task: "Materiaalkeuze/legpatronen advies", link: "/materiaalkeuze-legpatronen-advies" },
            { task: "Bestraten onder afschot (afwatering)", link: "/bestraten-onder-afschot-afwatering" }
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
            { task: "Tuingereedschap/-machines onderhoud/reparatie", link: "/tuingereedschap-machines-onderhoud-reparatie" },
            { task: "Elektrische bekabeling voor tuinapparatuur aanleggen", link: "/elektrische-bekabeling-tuinapparatuur-aanleggen" },
            { task: "Buitenstopcontacten plaatsen", link: "/buitenstopcontacten-plaatsen" },
            { task: "Energiezuinige tuinoplossingen advies", link: "/energiezuinige-tuinoplossingen-advies" },
            { task: "Tuin-/terrasverwarmers installatie", link: "/tuin-terrasverwarmers-installatie" },
            { task: "Zwemvijvers/natuurlijke zwembaden aanleg/onderhoud", link: "/zwemvijvers-natuurlijke-zwembaden-aanleg-onderhoud" },
            { task: "Automatische tuinpoorten/hekwerken installeren", link: "/automatische-tuinpoorten-hekwerken-installeren" },
            { task: "Technische problemen in tuin oplossen", link: "/technische-problemen-tuin-oplossen" },
            { task: "Technische installaties tuin periodieke controles", link: "/technische-installaties-tuin-periodieke-controles" },
            { task: "Bodemvochtigheidssensoren advies/installatie", link: "/bodemvochtigheidssensoren-advies-installatie" },
            { task: "Zonnepanelen/energieopslag voor tuinapparatuur", link: "/zonnepanelen-energieopslag-tuinapparatuur" },
            { task: "Tuinspeakers/geluidssystemen onderhoud/installatie", link: "/tuinspeakers-geluidssystemen-onderhoud-installatie" },
            { task: "Tuinserres mechanische/elektrische onderdelen onderhoud", link: "/tuinserres-mechanische-elektrische-onderdelen-onderhoud" },
            { task: "Automatische mest-/voedingssystemen plaatsen", link: "/automatische-mest-voedingssystemen-plaatsen" }
        ]
    },
    {
        id: 30,
        name: "Zwembadinstallateur",
        tasks: [
            { task: "Zwembadinstallateur Zwembadontwerp", link: "/zwembadontwerp" },
            { task: "Zwembadlocatie graven/voorbereiden", link: "/zwembadlocatie-graven-voorbereiden" },
            { task: "Inbouwzwembaden installeren", link: "/inbouwzwembaden-installeren" },
            { task: "Bovengrondse zwembaden aanleggen", link: "/bovengrondse-zwembaden-aanleggen" },
            { task: "Zwembadpompen/filters installeren", link: "/zwembadpompen-filters-installeren" },
            { task: "Zwembadverwarmingssystemen aansluiten/installeren", link: "/zwembadverwarmingssystemen-aansluiten-installeren" },
            { task: "Zwembadverlichting plaatsen", link: "/zwembadverlichting-plaatsen" },
            { task: "Zwembadafdekkingen/veiligheidshekken installeren", link: "/zwembadafdekkingen-veiligheidshekken-installeren" },
            { task: "Zwembadonderhoud/reparatie", link: "/zwembadonderhoud-reparatie" },
            { task: "Jacuzzi's/spa's installeren", link: "/jacuzzis-spas-installeren" },
            { task: "Zwembadtegels/voeringen aanbrengen", link: "/zwembadtegels-voeringen-aanbrengen" },
            { task: "Zwembadtrappen/duikplanken installeren", link: "/zwembadtrappen-duikplanken-installeren" },
            { task: "Watervallen/waterpartijen aanleggen", link: "/watervallen-waterpartijen-aanleggen" },
            { task: "Zwembadwater behandeling (chemicaliën) advies", link: "/zwembadwater-behandeling-chemicalien-advies" },
            { task: "Zoutwatersystemen installatie", link: "/zoutwatersystemen-installatie" },
            { task: "Lekdetectie/reparatie zwembaden", link: "/lekdetectie-reparatie-zwembaden" },
            { task: "Automatische zwembadreinigers installeren", link: "/automatische-zwembadreinigers-installeren" },
            { task: "Zwembadranden/terrassen aanleggen", link: "/zwembadranden-terrassen-aanleggen" },
            { task: "Energiezuinige zwembadoplossingen advies", link: "/energiezuinige-zwembadoplossingen-advies" },
            { task: "Saunafaciliteiten installeren/onderhouden", link: "/saunafaciliteiten-installeren-onderhouden" }
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
            { task: "Automatische meststof-/pesticidedoseringssystemen optimaliseren", link: "/automatische-meststof-pesticidedoseringssystemen-optimaliseren" },
            { task: "Robotmaaiers advies/installatie", link: "/robotmaaiers-advies-installatie" },
            { task: "Geautomatiseerd vijver-/waterelementmanagement opzetten", link: "/geautomatiseerd-vijver-waterelementmanagement-opzetten" },
            { task: "Smart home systemen/tuinapparaten integratie", link: "/smart-home-systemen-tuinapparaten-integratie" },
            { task: "Tuincamera's/beveiligingssystemen installeren/configureren", link: "/tuincameras-beveiligingssystemen-installeren-configureren" },
            { task: "Automatische plantenverzorgingssystemen (kassen/serres)", link: "/automatische-plantenverzorgingssystemen-kassen-serres" },
            { task: "Training/uitleg slimme tuinapparaten bediening", link: "/training-uitleg-slimme-tuinapparaten-bediening" },
            { task: "App-/software-integraties tuinbeheer ondersteuning", link: "/app-software-integraties-tuinbeheer-ondersteuning" },
            { task: "Problemen/storingen slimme tuinapparatuur oplossen", link: "/problemen-storingen-slimme-tuinapparatuur-oplossen" },
            { task: "Energie-/waterbesparing tuin advies", link: "/energie-waterbesparing-tuin-advies" },
            { task: "Slimme composteringssystemen implementeren", link: "/slimme-composteringssystemen-implementeren" },
            { task: "Zonne-energiesystemen tuin integratie ondersteuning", link: "/zonne-energiesystemen-tuin-integratie-ondersteuning" },
            { task: "Geautomatiseerde dierafweersystemen advies/installatie", link: "/geautomatiseerde-dierafweersystemen-advies-installatie" },
            { task: "Slimme vogelvoer-/observatiesystemen implementeren", link: "/slimme-vogelvoer-observatiesystemen-implementeren" },
            { task: "Slim tuinieren/stadslandbouw geïntegreerde systemen opzetten", link: "/slim-tuinieren-stadslandbouw-geintegreerde-systemen-opzetten" }
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
            { task: "Meubels monteren op nieuwe locatie", link: "/meubels-monteren-op-nieuwe-locatie" },
            { task: "Verhuisdozen uitpakken", link: "/verhuisdozen-uitpakken" },
            { task: "Tijdelijke inboedelopslag", link: "/tijdelijke-inboedelopslag" },
            { task: "Speciale verpakkingen voor breekbare/waardevolle items", link: "/speciale-verpakkingen-breekbare-waardevolle-items" },
            { task: "Speciale items verhuizen (piano's, kluizen, kunstwerken)", link: "/speciale-items-verhuizen" },
            { task: "Apparaten aansluiten op nieuwe locatie", link: "/apparaten-aansluiten-nieuwe-locatie" },
            { task: "Verhuislift regelen", link: "/verhuislift-regelen" },
            { task: "Overtollige spullen/afval afvoeren", link: "/overtollige-spullen-afval-afvoeren" },
            { task: "Parkeervergunningen/logistieke zaken regelen", link: "/parkeervergunningen-logistieke-zaken-regelen" },
            { task: "Verhuisstrategie advies", link: "/verhuisstrategie-advies" },
            { task: "Internationale verhuizingen (douaneformaliteiten)", link: "/internationale-verhuizingen-douaneformaliteiten" },
            { task: "Tijdelijke verhuisverzekeringen", link: "/tijdelijke-verhuisverzekeringen" },
            { task: "Lange termijn opslagoplossingen", link: "/lange-termijn-opslagoplossingen" },
            { task: "Hulp bij inrichten/plaatsen meubels in nieuwe woning", link: "/hulp-bij-inrichten-plaatsen-meubels" },
            { task: "Lege verhuisdozen/verpakkingsmateriaal terugnemen", link: "/lege-verhuisdozen-verpakkingsmateriaal-terugnemen" }
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
            { task: "Meerpuntssluitingen plaatsen", link: "/meerpuntssluitingen-plaatsen" },
            { task: "Sleutels bijmaken", link: "/sleutels-bijmaken" },
            { task: "Digitale/elektronische sloten installeren", link: "/digitale-elektronische-sloten-installeren" },
            { task: "Afgebroken sleutels uit sloten verwijderen", link: "/afgebroken-sleutels-uit-sloten-verwijderen" },
            { task: "Veiligheidsbeslag aanbrengen", link: "/veiligheidsbeslag-aanbrengen" },
            { task: "Cilinders vervangen/installeren", link: "/cilinders-vervangen-installeren" },
            { task: "Bijzetsloten plaatsen", link: "/bijzetsloten-plaatsen" },
            { task: "Raamsloten installeren", link: "/raamsloten-installeren" },
            { task: "Kluisjes/veilige opbergsystemen advies/plaatsen", link: "/kluisjes-veilige-opbergsystemen-advies-plaatsen" },
            { task: "Kluizen openen (verlies combinatie/sleutel)", link: "/kluizen-openen-verlies-combinatie-sleutel" },
            { task: "Autosloten repareren/vervangen", link: "/autosloten-repareren-vervangen" },
            { task: "Autosleutels bijmaken/transponders programmeren", link: "/autosleutels-bijmaken-transponders-programmeren" },
            { task: "Beveiligingsadvies (woningen/bedrijfspanden)", link: "/beveiligingsadvies-woningen-bedrijfspanden" },
            { task: "Toegangscontrolesystemen installeren", link: "/toegangscontrolesystemen-installeren" },
            { task: "Periodiek onderhoud sloten/beveiligingssystemen", link: "/periodiek-onderhoud-sloten-beveiligingssystemen" }
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
            { task: "Subsidies/Financiële regelingen voor verduurzaming advies", link: "/subsidies-financiele-regelingen-verduurzaming-advies" },
            { task: "Isolatietypen voordelen uitleggen", link: "/isolatietypen-voordelen-uitleggen" },
            { task: "Duurzame verwarmingsmethoden aanbevelen", link: "/duurzame-verwarmingsmethoden-aanbevelen" },
            { task: "Zonnepanelen plaatsing/opbrengst advies", link: "/zonnepanelen-plaatsing-opbrengst-advies" },
            { task: "Energielabels/-certificaten begeleiding", link: "/energielabels-certificaten-begeleiding" },
            { task: "Samenwerking met aannemers/installateurs", link: "/samenwerking-aannemers-installateurs" },
            { task: "Waterbesparende maatregelen informeren", link: "/waterbesparende-maatregelen-informeren" },
            { task: "Duurzame bouwmaterialen/-technieken advies", link: "/duurzame-bouwmaterialen-technieken-advies" },
            { task: "Groene daken/gevels voordelen uitleggen", link: "/groene-daken-gevels-voordelen-uitleggen" },
            { task: "Hergebruik/recycling mogelijkheden beoordelen", link: "/hergebruik-recycling-mogelijkheden-beoordelen" },
            { task: "Informatiebijeenkomsten/workshops over verduurzaming", link: "/informatiebijeenkomsten-workshops-verduurzaming" },
            { task: "Nieuwe technologieën/innovaties in verduurzaming bijhouden", link: "/nieuwe-technologieen-innovaties-verduurzaming-bijhouden" },
            { task: "Samenwerking met overheidsinstanties (lokale duurzaamheidsinitiatieven)", link: "/samenwerking-overheidsinstanties-lokale-duurzaamheidsinitiatieven" },
            { task: "Domotica/smart home systemen voor energiebeheer integratie", link: "/domotica-smart-home-systemen-energiebeheer-integratie" },
            { task: "Impact verduurzamingsmaatregelen evalueren", link: "/impact-verduurzamingsmaatregelen-evalueren" },
            { task: "Overstap naar duurzame energieleveranciers/energiecontracten begeleiden", link: "/overstap-duurzame-energieleveranciers-energiecontracten-begeleiden" }
          ]
          
    },
    {
        id: 35,
        name: "Ongediertebestrijder",
        tasks: [
            { task: "Muizen/ratten bestrijden", link: "/muizen-ratten-bestrijden" },
            { task: "Kakkerlakken bestrijden", link: "/kakkerlakken-bestrijden" },
            { task: "Mollen bestrijden", link: "/mollen-bestrijden" },
            { task: "Wespen/horzel nesten verwijderen", link: "/wespen-horzel-nesten-verwijderen" },
            { task: "Mieren bestrijden", link: "/mieren-bestrijden" },
            { task: "Vlooien/tick bestrijden", link: "/vlooien-tick-bestrijden" },
            { task: "Houtwormen/boktorren bestrijden", link: "/houtwormen-boktorren-bestrijden" },
            { task: "Zilvervisjes/papiervisjes bestrijden", link: "/zilvervisjes-papiervisjes-bestrijden" },
            { task: "Bedwantsen bestrijden", link: "/bedwantsen-bestrijden" },
            { task: "Duiven/ander gevogelte weren", link: "/duiven-ander-gevogelte-weren" },
            { task: "Rupsen/kevers bestrijden", link: "/rupsen-kevers-bestrijden" },
            { task: "Ongediertepreventie advies", link: "/ongediertepreventie-advies" },
            { task: "Ongediertebestrijding in tuinen", link: "/ongediertebestrijding-tuinen" },
            { task: "Lokdozen/vallen plaatsen", link: "/lokdozen-vallen-plaatsen" },
            { task: "Professionele bestrijdingsmiddelen gebruiken", link: "/professionele-bestrijdingsmiddelen-gebruiken" },
            { task: "Ecologische bestrijdingsmethoden toepassen", link: "/ecologische-bestrijdingsmethoden-toepassen" },
            { task: "Ongedierte inspectierapporten opstellen", link: "/ongedierte-inspectierapporten-opstellen" },
            { task: "Ongediertebestrijding bij bedrijfspanden", link: "/ongediertebestrijding-bedrijfspanden" },
            { task: "Hygiëneadvies ter preventie van ongedierte", link: "/hygieneadvies-preventie-ongedierte" },
            { task: "Biologische bestrijdingsmiddelen adviseren/gebruiken", link: "/biologische-bestrijdingsmiddelen-adviseren-gebruiken" }
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
            { task: "Natuur-/Wildlifemonitoring", link: "/natuur-wildlifemonitoring" },
            { task: "Kartografie/Landmeting", link: "/kartografie-landmeting" },
            { task: "Film-/Televisieopnames", link: "/film-televisieopnames" },
            { task: "Bewaking/Beveiliging met Drones", link: "/bewaking-beveiliging-met-drones" },
            { task: "Kleine Pakketten Levering", link: "/kleine-pakketten-levering" },
            { task: "Energie-Installaties Inspectie (Windturbines, Zonnepanelen)", link: "/energie-installaties-inspectie" },
            { task: "Brand-/Reddingsoperaties", link: "/brand-reddingsoperaties" },
            { task: "Evenementenfotografie/-Videografie", link: "/evenementenfotografie-videografie" },
            { task: "Luchtkwaliteitsmetingen", link: "/luchtkwaliteitsmetingen" },
            { task: "Onderzoek/Dataverzameling", link: "/onderzoek-dataverzameling" },
            { task: "Sport-/Actiefotografie", link: "/sport-actiefotografie" },
            { task: "Wedstrijd-/Racebeelden", link: "/wedstrijd-racebeelden" },
            { task: "Maritieme/Kustbewaking", link: "/maritieme-kustbewaking" },
            { task: "Drone-Vliegen Training/Workshops", link: "/drone-vliegen-training-workshops" },
            { task: "3D-Modellering/-Mapping", link: "/3d-modellering-mapping" },
            
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