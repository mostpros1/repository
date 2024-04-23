const specialists = [
    {
        id: 1,
        name: "Loodgieter",
        tasks: [
            { task: "Loodgieter Sanitair Installatie/Vervanging", link: "/sanitair-installeren" },
            { task: "Loodgieter Lekkende Kranen/Leidingen Reparatie", link: "/lekkages-repareren" },
            { task: "Loodgieter Afvoer Ontstopping", link: "/lekkages-repareren" },
            { task: "Loodgieter Boiler/Geiser Onderhoud", link: "/lekkages-repareren" },
            { task: "Loodgieter Verwarmingssysteem Reparatie/Installatie", link: "/verwarmingssysteem-reparatie-installatie" },
        ]
    },
    {
        id: 2,
        name: "Hovenier",
        tasks: [
            { task: "Hovenier Tuinontwerp maken", link: "/tuinontwerp-maken" },
            { task: "Hovenier Planten verzorgen", link: "/planten-verzorgen" },

            { task: "Hovenier Tuinaanleg", link: "/tuinaanleg" },
            { task: "Hovenier Tuinonderhoud (Snoeien, Bemesten, Onkruid)", link: "/tuinonderhoud" },
            { task: "Hovenier Bomen/Struiken/Planten Planten", link: "/planten-planten" },
            { task: "Hovenier Gazons Aanleggen (Zaaien/Graszoden)", link: "/gazons-aanleggen" },
            { task: "Hovenier Bewateringssystemen Installeren", link: "/bewateringssystemen-installeren" },
        ]
    },
    {
        id: 3,
        name: "Elektriciën ",
        tasks: [
            { task: "Elektriciën Elektrische bedrading repareren", link: "/elektrische-bedrading-repareren" },
            { task: "Elektriciën Stopcontacten installeren", link: "/stopcontacten-installeren" },

            { task: "Elektriciën Nieuwe Elektrische Bedrading Installatie", link: "/nieuwe-elektrische-bedrading-installatie" },
            { task: "Elektriciën Elektrische Onderhoud", link: "/elektrische-olnderhoud" },
            { task: "Elektriciën Groepenkast Werkzaamheden", link: "/groepenkast-werkzaamheden" },
            { task: "Elektriciën Verlichtingsarmaturen Werkzaamheden", link: "/verlichtingsarmaturen-werkzaamheden" },
            { task: "Elektriciën Stopcontacten werkzaamheden", link: "/stopcontacten-werkzaamheden" },
            { task: "Elektriciën Elektrische aarding veiligstellen", link: "/elektrische-aarding-veiligstellen" },
            { task: "Elektriciën Elektrische inspecties", link: "/elektrische-inspecties" },
            { task: "Elektriciën Data/communicatiebedrading werkzaamheden", link: "/data-communicatiebedrading-werkzaamheden" },
            { task: "Elektriciën Beveiligingssystemen installatie", link: "/beveiligingssystemen-installatie" },
            { task: "Elektriciën Domotica/smart home installatie", link: "/domotica-smart-home-installatie" },
            { task: "Elektriciën Generatoren/noodstroom installatie", link: "/generatoren-noodstroom-installatie" },
            { task: "Elektriciën Energiezuinige oplossingen advies", link: "/energiezuinige-oplossingen-advies" },
            { task: "Elektriciën Elektrische verwarmingssystemen werkzaamheden", link: "/elektrische-verwarmingssystemen-werkzaamheden" },
            { task: "Elektriciën Ventilatie/airco elektrische aansluitingen", link: "/ventilatie-airco-elektrische-aansluitingen" },
            { task: "Elektriciën Grote elektrische apparaten aansluiting/reparatie", link: "/grote-elektrische-apparaten-aansluiting-reparatie" }
        ]
    },
    {
        id: 4,
        name: "Dakdekker",
        tasks: [
            { task: "Dakdekker Dakreparaties uitvoeren", link: "/dakreparaties-uitvoeren" },
            { task: "Dakdekker Dakbedekking vervangen", link: "/dakbedekking-vervangen" },

            { task: "Dakdekker Nieuwe Daken Plaatsen", link: "/nieuwe-daken-plaatsen" },
            { task: "Dakdekker Oude Daken Vervangen", link: "/oude-daken-vervangen" },
            { task: "Dakdekker Beschadigde Daken Repareren", link: "/beschadigde-daken-repareren" },
            { task: "Dakdekker Dakisolatie Installeren", link: "/dakisolatie-installeren" },
            { task: "Dakdekker Dakbedekking Aanbrengen", link: "/dakbedekking-aanbrengen" },
            { task: "Dakdekker Dakconstructie/dakbedekking maken", link: "/dakconstructie-dakbedekking-maken" },
            { task: "Dakdekker Buitenconstructies (schuttingen, terrassen, pergola's)", link: "/buitenconstructies-schuttingen-terrassen-pergolas" },
            { task: "Dakdekker Houtstructuren/meubels repareren", link: "/houtstructuren-meubels-repareren" },
            { task: "Dakdekker Maatwerk houten meubels", link: "/maatwerk-houten-meubels" },
            { task: "Dakdekker Houten kozijnen plaatsen/repareren", link: "/houten-kozijnen-plaatsen-repareren" },
            { task: "Dakdekker Renovatie/restauratie werkzaamheden", link: "/renovatie-restauratie-werkzaamheden" },
            { task: "Dakdekker Houten panelen/wandbekleding", link: "/houten-panelen-wandbekleding" },
            { task: "Dakdekker Geluidsisolatie/bouwkundige aanpassingen", link: "/geluidsisolatie-bouwkundige-aanpassingen" },
            { task: "Dakdekker Houten aan/uitbouwen", link: "/houten-aan-uitbouwen" },
            { task: "Dakdekker Overkappingen/carports bouwen", link: "/overkappingen-carports-bouwen" },
            { task: "Dakdekker Tuinhuisjes/schuren/buitenconstructies", link: "/tuinhuisjes-schuren-buitenconstructies" },
            { task: "Dakdekker Samenwerking met andere vakmensen", link: "/samenwerking-met-andere-vakmensen" },
            { task: "Dakdekker Houten gevelbekleding", link: "/houten-gevelbekleding" },
            { task: "Dakdekker Houten speeltoestellen/buitenmeubels maken", link: "/houten-speeltoestellen-buitenmeubels-maken" }
        ]
    },
    {
        id: 5,
        name: "Schoonmaker",
        tasks: [
            { task: "Schoonmaker Schoonmaken van woningen", link: "/schoonmaken-van-woningen" },
            { task: "Schoonmaker Ramen wassen", link: "/ramen-wassen" },

            { task: "Schoonmaker Vloeren/Tapijten Stofzuigen", link: "/vloeren-tapijten-stofzuigen" },
            { task: "Schoonmaker Vloeren Dweilen", link: "/vloeren-dweilen" },
            { task: "Schoonmaker Meubels/Oppervlakken Afstoffen", link: "/meubels-oppervlakken-afstoffen" },
            { task: "Schoonmaker Ramen/Spiegels Reinigen", link: "/ramen-spiegels-reinigen" },
            { task: "Schoonmaker Prullenbakken Legen/Vervangen", link: "/prullenbakken-legen-vervangen" },
            { task: "Schoonmaker Keuken schoonmaak (aanrecht, apparaten, vloer)", link: "/keuken-schoonmaak" },
            { task: "Schoonmaker Badkamer schoonmaak (toilet, douche, bad, wastafel)", link: "/badkamer-schoonmaak" },
            { task: "Schoonmaker Beddengoed verschonen", link: "/beddengoed-verschonen" },
            { task: "Schoonmaker Vlekkenbehandeling (vloeren/meubels)", link: "/vlekkenbehandeling-vloeren-meubels" },
            { task: "Schoonmaker Oppervlakken desinfecteren", link: "/oppervlakken-desinfecteren" },
            { task: "Schoonmaker Buitenruimtes (terrassen/balkons) reinigen", link: "/buitenruimtes-reinigen" },
            { task: "Schoonmaker Tapijt stoomreinigen", link: "/tapijt-stoomreinigen" },
            { task: "Schoonmaker Opruimen rondslingerende spullen", link: "/opruimen-rondslingerende-spullen" },
            { task: "Schoonmaker Meubels/metalen polijsten", link: "/meubels-metalen-polijsten" },
            { task: "Schoonmaker Gordijnen/raambekleding reinigen", link: "/gordijnen-raambekleding-reinigen" },
            { task: "Schoonmaker Huishoudelijke apparaten schoonmaken", link: "/huishoudelijke-apparaten-schoonmaken" },
            { task: "Schoonmaker Schimmel/kalkaanslag verwijderen", link: "/schimmel-kalkaanslag-verwijderen" },
            { task: "Schoonmaker Luchtkanalen/ventilatie reinigen", link: "/luchtkanalen-ventilatie-reinigen" },
            { task: "Schoonmaker Kinderspeelgoed/speelruimtes desinfecteren", link: "/kinderspeelgoed-speelruimtes-desinfecteren" },
            { task: "Schoonmaker Periodieke dieptereiniging/grote schoonmaak", link: "/periodieke-dieptereiniging-grote-schoonmaak" }
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
        name: "Behanger ",
        tasks: [
            { task: "Behanger Oud behang verwijderen", link: "/oud-behang-verwijderen" },
            { task: "Behanger Muurvoorbereiding", link: "/muurvoorbereiding" },
            { task: "Behanger Voorstrijk/primer aanbrengen", link: "/voorstrijk-primer-aanbrengen" },
            { task: "Behanger Behangrollen knippen/meten", link: "/behangrollen-knippen-meten" },
            { task: "Behanger Behanglijm aanbrengen", link: "/behanglijm-aanbrengen" },
            { task: "Behanger Behang gladstrijken (luchtbellen)", link: "/behang-gladstrijken-luchtbellen" },
            { task: "Behanger Afwerking hoeken/randen/stopcontacten", link: "/afwerking-hoeken-randen-stopcontacten" },
            { task: "Behanger Verschillende behangsoorten", link: "/verschillende-behangsoorten" },
            { task: "Behanger Patronen/naden aansluiten", link: "/patronen-naden-aansluiten" },
            { task: "Behanger Decoratieve wandbekleding (muurstickers)", link: "/decoratieve-wandbekleding-muurstickers" },
            { task: "Behanger Plafonds/schuine wanden behangen", link: "/plafonds-schuine-wanden-behangen" },
            { task: "Behanger Behangtype/ontwerp advies", link: "/behangtype-ontwerp-advies" },
            { task: "Behanger Kleuren/patronen mengen", link: "/kleuren-patronen-mengen" },
            { task: "Behanger Speciale technieken (fotobehang, 3D)", link: "/speciale-technieken-fotobehang-3d" },
            { task: "Behanger Muurbeschadigingen herstellen", link: "/muurbeschadigingen-herstellen" },
            { task: "Behanger Gereedschap onderhoud", link: "/gereedschap-onderhoud" },
            { task: "Behanger Nazorg/behang onderhoudsinstructies", link: "/nazorg-behang-onderhoudsinstructies" },
            { task: "Behanger Beschermende coatings over behang", link: "/beschermende-coatings-over-behang" },
            { task: "Behanger Periodiek onderhoud/behang vervanging", link: "/periodiek-onderhoud-behang-vervanging" }
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
        name: "Stratenmaker ",
        tasks: [
            { task: "Stratenmaker Opritten aanleggen", link: "/opritten-aanleggen" },
            { task: "Stratenmaker Terrassen leggen", link: "/terrassen-leggen" },
            { task: "Stratenmaker Tuinpaden aanleggen", link: "/tuinpaden-aanleggen" },
            { task: "Stratenmaker Trottoirs/stoepen plaatsen", link: "/trottoirs-stoepen-plaatsen" },
            { task: "Stratenmaker Sierbestrating leggen", link: "/sierbestrating-leggen" }, 
            { task: "Stratenmaker Verzakte bestrating herstellen", link: "/verzakte-bestrating-herstellen" },
            { task: "Stratenmaker Kantopsluitingen aanbrengen", link: "/kantopsluitingen-aanbrengen" },
            { task: "Stratenmaker Goten/afwateringssystemen plaatsen", link: "/goten-afwateringssystemen-plaatsen" },
            { task: "Stratenmaker Parkeerplaatsen/-terreinen leggen", link: "/parkeerplaatsen-terreinen-leggen" },
            { task: "Stratenmaker Openbare wegen/pleinen aanleggen", link: "/openbare-wegen-pleinen-aanleggen" },
            { task: "Stratenmaker Bestaande bestrating onderhoud", link: "/bestaande-bestrating-onderhoud" },
            { task: "Stratenmaker Speelplekken/schoolpleinen aanleggen", link: "/speelplekken-schoolpleinen-aanleggen" },
            { task: "Stratenmaker Fiets-/wandelpaden leggen", link: "/fiets-wandelpaden-leggen" },
            { task: "Stratenmaker Diverse bestratingsmaterialen toepassen", link: "/diverse-bestratingsmaterialen-toepassen" },
            { task: "Stratenmaker Belijning/markeringen aanbrengen", link: "/belijning-markeringen-aanbrengen" },
            { task: "Stratenmaker Straatmeubilair plaatsen", link: "/straatmeubilair-plaatsen" },
            { task: "Stratenmaker Oude bestrating verwijderen", link: "/oude-bestrating-verwijderen" },
            { task: "Stratenmaker Grondwerk voorbereiding voor bestrating", link: "/grondwerk-voorbereiding-voor-bestrating" },
            { task: "Stratenmaker Materiaalkeuze/legpatronen advies", link: "/materiaalkeuze-legpatronen-advies" },
            { task: "Stratenmaker Bestraten onder afschot (afwatering)", link: "/bestraten-onder-afschot-afwatering" }
        ]
    },
    {
        id: 29,
        name: "Tuintechnicus ",
        tasks: [
            { task: "Tuintechnicus Tuinverlichting installeren", link: "/tuinverlichting-installeren" },
            { task: "Tuintechnicus Irrigatie-/druppelsystemen aanleggen", link: "/irrigatie-druppelsystemen-aanleggen" },
            { task: "Tuintechnicus Vijverpompen/-filters installatie", link: "/vijverpompen-filters-installatie" },
            { task: "Tuintechnicus Fonteinen/waterpartijen plaatsen/onderhoud", link: "/fonteinen-waterpartijen-plaatsen-onderhoud" },
            { task: "Tuintechnicus Tuinberegeningssystemen installeren", link: "/tuinberegeningssystemen-installeren" }, 
            { task: "Tuintechnicus Tuingereedschap/-machines onderhoud/reparatie", link: "/tuingereedschap-machines-onderhoud-reparatie" },
            { task: "Tuintechnicus Elektrische bekabeling voor tuinapparatuur aanleggen", link: "/elektrische-bekabeling-tuinapparatuur-aanleggen" },
            { task: "Tuintechnicus Buitenstopcontacten plaatsen", link: "/buitenstopcontacten-plaatsen" },
            { task: "Tuintechnicus Energiezuinige tuinoplossingen advies", link: "/energiezuinige-tuinoplossingen-advies" },
            { task: "Tuintechnicus Tuin-/terrasverwarmers installatie", link: "/tuin-terrasverwarmers-installatie" },
            { task: "Tuintechnicus Zwemvijvers/natuurlijke zwembaden aanleg/onderhoud", link: "/zwemvijvers-natuurlijke-zwembaden-aanleg-onderhoud" },
            { task: "Tuintechnicus Automatische tuinpoorten/hekwerken installeren", link: "/automatische-tuinpoorten-hekwerken-installeren" },
            { task: "Tuintechnicus Technische problemen in tuin oplossen", link: "/technische-problemen-tuin-oplossen" },
            { task: "Tuintechnicus Technische installaties tuin periodieke controles", link: "/technische-installaties-tuin-periodieke-controles" },
            { task: "Tuintechnicus Bodemvochtigheidssensoren advies/installatie", link: "/bodemvochtigheidssensoren-advies-installatie" },
            { task: "Tuintechnicus Zonnepanelen/energieopslag voor tuinapparatuur", link: "/zonnepanelen-energieopslag-tuinapparatuur" },
            { task: "Tuintechnicus Tuinspeakers/geluidssystemen onderhoud/installatie", link: "/tuinspeakers-geluidssystemen-onderhoud-installatie" },
            { task: "Tuintechnicus Tuinserres mechanische/elektrische onderdelen onderhoud", link: "/tuinserres-mechanische-elektrische-onderdelen-onderhoud" },
            { task: "Tuintechnicus Automatische mest-/voedingssystemen plaatsen", link: "/automatische-mest-voedingssystemen-plaatsen" }
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
            { task: "Smart garden adviseur Slimme tuinoplossingen advies", link: "/slimme-tuinoplossingen-advies" },
            { task: "Smart garden adviseur Geautomatiseerde irrigatiesystemen implementeren", link: "/geautomatiseerde-irrigatiesystemen-implementeren" },
            { task: "Smart garden adviseur Slimme tuinverlichting installeren", link: "/slimme-tuinverlichting-installeren" },
            { task: "Smart garden adviseur Slimme weersensoren integreren", link: "/slimme-weersensoren-integreren" },
            { task: "Smart garden adviseur Plantenmonitors/bodemsensoren configureren", link: "/plantenmonitors-bodemsensoren-configureren" },
            { task: "Smart garden adviseur Automatische meststof-/pesticidedoseringssystemen optimaliseren", link: "/automatische-meststof-pesticidedoseringssystemen-optimaliseren" },
            { task: "Smart garden adviseur Robotmaaiers advies/installatie", link: "/robotmaaiers-advies-installatie" },
            { task: "Smart garden adviseur Geautomatiseerd vijver-/waterelementmanagement opzetten", link: "/geautomatiseerd-vijver-waterelementmanagement-opzetten" },
            { task: "Smart garden adviseur Smart home systemen/tuinapparaten integratie", link: "/smart-home-systemen-tuinapparaten-integratie" },
            { task: "Smart garden adviseur Tuincamera's/beveiligingssystemen installeren/configureren", link: "/tuincameras-beveiligingssystemen-installeren-configureren" },
            { task: "Smart garden adviseur Automatische plantenverzorgingssystemen (kassen/serres)", link: "/automatische-plantenverzorgingssystemen-kassen-serres" },
            { task: "Smart garden adviseur Training/uitleg slimme tuinapparaten bediening", link: "/training-uitleg-slimme-tuinapparaten-bediening" },
            { task: "Smart garden adviseur App-/software-integraties tuinbeheer ondersteuning", link: "/app-software-integraties-tuinbeheer-ondersteuning" },
            { task: "Smart garden adviseur Problemen/storingen slimme tuinapparatuur oplossen", link: "/problemen-storingen-slimme-tuinapparatuur-oplossen" },
            { task: "Smart garden adviseur Energie-/waterbesparing tuin advies", link: "/energie-waterbesparing-tuin-advies" },
            { task: "Smart garden adviseur Slimme composteringssystemen implementeren", link: "/slimme-composteringssystemen-implementeren" },
            { task: "Smart garden adviseur Zonne-energiesystemen tuin integratie ondersteuning", link: "/zonne-energiesystemen-tuin-integratie-ondersteuning" },
            { task: "Smart garden adviseur Geautomatiseerde dierafweersystemen advies/installatie", link: "/geautomatiseerde-dierafweersystemen-advies-installatie" },
            { task: "Smart garden adviseur Slimme vogelvoer-/observatiesystemen implementeren", link: "/slimme-vogelvoer-observatiesystemen-implementeren" },
            { task: "Smart garden adviseur Slim tuinieren/stadslandbouw geïntegreerde systemen opzetten", link: "/slim-tuinieren-stadslandbouw-geintegreerde-systemen-opzetten" }
        ]
    },
    {
        id: 32,
        name: "Verhuizer",
        tasks: [
            { task: "Verhuizer Huishoudelijke artikelen/meubels inpakken", link: "/huishoudelijke-artikelen-meubels-inpakken" },
            { task: "Verhuizer Meubels demonteren", link: "/meubels-demonteren" },
            { task: "Verhuizer Verhuisdozen/meubels laden in verhuiswagen", link: "/verhuisdozen-meubels-laden-in-verhuiswagen" },
            { task: "Verhuizer Inboedel vervoeren naar nieuwe locatie", link: "/inboedel-vervoeren-naar-nieuwe-locatie" },
            { task: "Verhuizer Verhuisdozen/meubels uitladen op nieuwe locatie", link: "/verhuisdozen-meubels-uitladen-op-nieuwe-locatie" },
            { task: "Verhuizer Meubels monteren op nieuwe locatie", link: "/meubels-monteren-op-nieuwe-locatie" },
            { task: "Verhuizer Verhuisdozen uitpakken", link: "/verhuisdozen-uitpakken" },
            { task: "Verhuizer Tijdelijke inboedelopslag", link: "/tijdelijke-inboedelopslag" },
            { task: "Verhuizer Speciale verpakkingen voor breekbare/waardevolle items", link: "/speciale-verpakkingen-breekbare-waardevolle-items" },
            { task: "Verhuizer Speciale items verhuizen (piano's, kluizen, kunstwerken)", link: "/speciale-items-verhuizen" },
            { task: "Verhuizer Apparaten aansluiten op nieuwe locatie", link: "/apparaten-aansluiten-nieuwe-locatie" },
            { task: "Verhuizer Verhuislift regelen", link: "/verhuislift-regelen" },
            { task: "Verhuizer Overtollige spullen/afval afvoeren", link: "/overtollige-spullen-afval-afvoeren" },
            { task: "Verhuizer Parkeervergunningen/logistieke zaken regelen", link: "/parkeervergunningen-logistieke-zaken-regelen" },
            { task: "Verhuizer Verhuisstrategie advies", link: "/verhuisstrategie-advies" },
            { task: "Verhuizer Internationale verhuizingen (douaneformaliteiten)", link: "/internationale-verhuizingen-douaneformaliteiten" },
            { task: "Verhuizer Tijdelijke verhuisverzekeringen", link: "/tijdelijke-verhuisverzekeringen" },
            { task: "Verhuizer Lange termijn opslagoplossingen", link: "/lange-termijn-opslagoplossingen" },
            { task: "Verhuizer Hulp bij inrichten/plaatsen meubels in nieuwe woning", link: "/hulp-bij-inrichten-plaatsen-meubels" },
            { task: "Verhuizer Lege verhuisdozen/verpakkingsmateriaal terugnemen", link: "/lege-verhuisdozen-verpakkingsmateriaal-terugnemen" }
        ]
    },
    {
        id: 33,
        name: "Slotenmaker",
        tasks: [
            { task: "Slotenmaker Deuren openen bij buitensluiting", link: "/deuren-openen-bij-buitensluiting" },
            { task: "Slotenmaker Sloten vervangen", link: "/sloten-vervangen" },
            { task: "Slotenmaker Nieuwe sloten installeren", link: "/nieuwe-sloten-installeren" },
            { task: "Slotenmaker Beschadigde sloten repareren", link: "/beschadigde-sloten-repareren" },
            { task: "Slotenmaker Inbraakpreventie advies", link: "/inbraakpreventie-advies" },
            { task: "Slotenmaker Meerpuntssluitingen plaatsen", link: "/meerpuntssluitingen-plaatsen" },
            { task: "Slotenmaker Sleutels bijmaken", link: "/sleutels-bijmaken" },
            { task: "Slotenmaker Digitale/elektronische sloten installeren", link: "/digitale-elektronische-sloten-installeren" },
            { task: "Slotenmaker Afgebroken sleutels uit sloten verwijderen", link: "/afgebroken-sleutels-uit-sloten-verwijderen" },
            { task: "Slotenmaker Veiligheidsbeslag aanbrengen", link: "/veiligheidsbeslag-aanbrengen" },
            { task: "Slotenmaker Cilinders vervangen/installeren", link: "/cilinders-vervangen-installeren" },
            { task: "Slotenmaker Bijzetsloten plaatsen", link: "/bijzetsloten-plaatsen" },
            { task: "Slotenmaker Raamsloten installeren", link: "/raamsloten-installeren" },
            { task: "Slotenmaker Kluisjes/veilige opbergsystemen advies/plaatsen", link: "/kluisjes-veilige-opbergsystemen-advies-plaatsen" },
            { task: "Slotenmaker Kluizen openen (verlies combinatie/sleutel)", link: "/kluizen-openen-verlies-combinatie-sleutel" },
            { task: "Slotenmaker Autosloten repareren/vervangen", link: "/autosloten-repareren-vervangen" },
            { task: "Slotenmaker Autosleutels bijmaken/transponders programmeren", link: "/autosleutels-bijmaken-transponders-programmeren" },
            { task: "Slotenmaker Beveiligingsadvies (woningen/bedrijfspanden)", link: "/beveiligingsadvies-woningen-bedrijfspanden" },
            { task: "Slotenmaker Toegangscontrolesystemen installeren", link: "/toegangscontrolesystemen-installeren" },
            { task: "Slotenmaker Periodiek onderhoud sloten/beveiligingssystemen", link: "/periodiek-onderhoud-sloten-beveiligingssystemen" }
          ]
          
    },
    {
        id: 34,
        name: "Verduurzamingsadviseur",
        tasks: [
            { task: "Verduurzamingsadviseur Huidige energieprestatie analyseren", link: "/huidige-energieprestatie-analyseren" },
            { task: "Verduurzamingsadviseur Energiebesparende maatregelen advies", link: "/energiebesparende-maatregelen-advies" },
            { task: "Verduurzamingsadviseur Verduurzamingsplan opstellen", link: "/verduurzamingsplan-opstellen" },
            { task: "Verduurzamingsadviseur Terugverdientijd duurzame investeringen berekenen", link: "/terugverdientijd-duurzame-investeringen-berekenen" },
            { task: "Verduurzamingsadviseur Isolatietypen voordelen uitleggen", link: "/isolatietypen-voordelen-uitleggen" },
            { task: "Verduurzamingsadviseur Subsidies/Financiële regelingen voor verduurzaming advies", link: "/subsidies-financiele-regelingen-verduurzaming-advies" },
            { task: "Verduurzamingsadviseur Isolatietypen voordelen uitleggen", link: "/isolatietypen-voordelen-uitleggen" },
            { task: "Verduurzamingsadviseur Duurzame verwarmingsmethoden aanbevelen", link: "/duurzame-verwarmingsmethoden-aanbevelen" },
            { task: "Verduurzamingsadviseur Zonnepanelen plaatsing/opbrengst advies", link: "/zonnepanelen-plaatsing-opbrengst-advies" },
            { task: "Verduurzamingsadviseur Energielabels/-certificaten begeleiding", link: "/energielabels-certificaten-begeleiding" },
            { task: "Verduurzamingsadviseur Samenwerking met aannemers/installateurs", link: "/samenwerking-aannemers-installateurs" },
            { task: "Verduurzamingsadviseur Waterbesparende maatregelen informeren", link: "/waterbesparende-maatregelen-informeren" },
            { task: "Verduurzamingsadviseur Duurzame bouwmaterialen/-technieken advies", link: "/duurzame-bouwmaterialen-technieken-advies" },
            { task: "Verduurzamingsadviseur Groene daken/gevels voordelen uitleggen", link: "/groene-daken-gevels-voordelen-uitleggen" },
            { task: "Verduurzamingsadviseur Hergebruik/recycling mogelijkheden beoordelen", link: "/hergebruik-recycling-mogelijkheden-beoordelen" },
            { task: "Verduurzamingsadviseur Informatiebijeenkomsten/workshops over verduurzaming", link: "/informatiebijeenkomsten-workshops-verduurzaming" },
            { task: "Verduurzamingsadviseur Nieuwe technologieën/innovaties in verduurzaming bijhouden", link: "/nieuwe-technologieen-innovaties-verduurzaming-bijhouden" },
            { task: "Verduurzamingsadviseur Samenwerking met overheidsinstanties (lokale duurzaamheidsinitiatieven)", link: "/samenwerking-overheidsinstanties-lokale-duurzaamheidsinitiatieven" },
            { task: "Verduurzamingsadviseur Domotica/smart home systemen voor energiebeheer integratie", link: "/domotica-smart-home-systemen-energiebeheer-integratie" },
            { task: "Verduurzamingsadviseur Impact verduurzamingsmaatregelen evalueren", link: "/impact-verduurzamingsmaatregelen-evalueren" },
            { task: "Verduurzamingsadviseur Overstap naar duurzame energieleveranciers/energiecontracten begeleiden", link: "/overstap-duurzame-energieleveranciers-energiecontracten-begeleiden" }
          ]
          
    },
    {
        id: 35,
        name: "Ongediertebestrijder",
        tasks: [
            { task: "Ongediertebestrijder Muizen/ratten bestrijden", link: "/muizen-ratten-bestrijden" },
            { task: "Ongediertebestrijder Kakkerlakken bestrijden", link: "/kakkerlakken-bestrijden" },
            { task: "Ongediertebestrijder Mollen bestrijden", link: "/mollen-bestrijden" },
            { task: "Ongediertebestrijder Wespen/horzel nesten verwijderen", link: "/wespen-horzel-nesten-verwijderen" },
            { task: "Ongediertebestrijder Mieren bestrijden", link: "/mieren-bestrijden" },
            { task: "Ongediertebestrijder Vlooien/tick bestrijden", link: "/vlooien-tick-bestrijden" },
            { task: "Ongediertebestrijder Houtwormen/boktorren bestrijden", link: "/houtwormen-boktorren-bestrijden" },
            { task: "Ongediertebestrijder Zilvervisjes/papiervisjes bestrijden", link: "/zilvervisjes-papiervisjes-bestrijden" },
            { task: "Ongediertebestrijder Bedwantsen bestrijden", link: "/bedwantsen-bestrijden" },
            { task: "Ongediertebestrijder Duiven/ander gevogelte weren", link: "/duiven-ander-gevogelte-weren" },
            { task: "Ongediertebestrijder Rupsen/kevers bestrijden", link: "/rupsen-kevers-bestrijden" },
            { task: "Ongediertebestrijder Ongediertepreventie advies", link: "/ongediertepreventie-advies" },
            { task: "Ongediertebestrijder Ongediertebestrijding in tuinen", link: "/ongediertebestrijding-tuinen" },
            { task: "Ongediertebestrijder Lokdozen/vallen plaatsen", link: "/lokdozen-vallen-plaatsen" },
            { task: "Ongediertebestrijder Professionele bestrijdingsmiddelen gebruiken", link: "/professionele-bestrijdingsmiddelen-gebruiken" },
            { task: "Ongediertebestrijder Ecologische bestrijdingsmethoden toepassen", link: "/ecologische-bestrijdingsmethoden-toepassen" },
            { task: "Ongediertebestrijder Ongedierte inspectierapporten opstellen", link: "/ongedierte-inspectierapporten-opstellen" },
            { task: "Ongediertebestrijder Ongediertebestrijding bij bedrijfspanden", link: "/ongediertebestrijding-bedrijfspanden" },
            { task: "Ongediertebestrijder Hygiëneadvies ter preventie van ongedierte", link: "/hygieneadvies-preventie-ongedierte" },
            { task: "Ongediertebestrijder Biologische bestrijdingsmiddelen adviseren/gebruiken", link: "/biologische-bestrijdingsmiddelen-adviseren-gebruiken" }
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
            { task: "Drone piloot Luchtfotografie/-videografie", link: "/luchtfotografie-videografie" },
            { task: "Drone piloot Gebouwen/infrastructuur inspectie", link: "/gebouwen-infrastructuur-inspectie" },
            { task: "Drone piloot Landbouw monitoring/gewasinspectie", link: "/landbouw-monitoring-gewasinspectie" },
            { task: "Drone piloot Vastgoedpromotie/-vertoning", link: "/vastgoedpromotie-vertoning" },
            { task: "Drone piloot Inspectie moeilijk bereikbare locaties", link: "/inspectie-moeilijk-bereikbare-locaties" },
            { task: "Drone piloot Natuur-/Wildlifemonitoring", link: "/natuur-wildlifemonitoring" },
            { task: "Drone piloot Kartografie/Landmeting", link: "/kartografie-landmeting" },
            { task: "Drone piloot Film-/Televisieopnames", link: "/film-televisieopnames" },
            { task: "Drone piloot Bewaking/Beveiliging met Drones", link: "/bewaking-beveiliging-met-drones" },
            { task: "Drone piloot Kleine Pakketten Levering", link: "/kleine-pakketten-levering" },
            { task: "Drone piloot Energie-Installaties Inspectie (Windturbines, Zonnepanelen)", link: "/energie-installaties-inspectie" },
            { task: "Drone piloot Brand-/Reddingsoperaties", link: "/brand-reddingsoperaties" },
            { task: "Drone piloot Evenementenfotografie/-Videografie", link: "/evenementenfotografie-videografie" },
            { task: "Drone piloot Luchtkwaliteitsmetingen", link: "/luchtkwaliteitsmetingen" },
            { task: "Drone piloot Onderzoek/Dataverzameling", link: "/onderzoek-dataverzameling" },
            { task: "Drone piloot Sport-/Actiefotografie", link: "/sport-actiefotografie" },
            { task: "Drone piloot Wedstrijd-/Racebeelden", link: "/wedstrijd-racebeelden" },
            { task: "Drone piloot Maritieme/Kustbewaking", link: "/maritieme-kustbewaking" },
            { task: "Drone piloot Drone-Vliegen Training/Workshops", link: "/drone-vliegen-training-workshops" },
            { task: "Drone piloot 3D-Modellering/-Mapping", link: "/3d-modellering-mapping" },
            
        ]
    },
    {
        id: 41,
        name: "Robot adviseur",
        tasks: [
            { task: "Robot adviseur Home robot advies/installatie", link: "/home-robot-advies-installatie" },
            { task: "Robot adviseur Maairobot advies/installatie", link: "/maairobot-advies-installatie" },
            { task: "Robot adviseur Zwembadrobot advies/installatie", link: "/zwembadrobot-advies-installatie" },
            { task: "Robot adviseur Robotstofzuiger advies/installatie", link: "/robotstofzuiger-advies-installatie" },
            { task: "Robot adviseur Robotramenwasser advies/installatie", link: "/robotramenwasser-advies-installatie" },
        ]
    },
    // Voeg hier meer specialisten toe met hun specifieke taken
];



export default specialists