export interface CaseField {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "radio";
  options?: string[];
  placeholder?: string;
  required: boolean;
}

export interface CaseType {
  id: string;
  label: string;
  icon: string;
  color: string;
  objective: string;
  fields: CaseField[];
  generateLetter: (data: any) => string;
}

export const CASES: Record<string, CaseType> = {
  colis: {
    id: "colis",
    label: "Colis ou livraison non reçue",
    icon: "📦",
    color: "#E11D48",
    objective: "Formaliser une réclamation pour commande non reçue.",
    fields: [
      { id: "brand", label: "Nom de l'enseigne", type: "text", placeholder: "Ex: Amazon, Fnac...", required: true },
      { id: "orderNumber", label: "Numéro de commande", type: "text", placeholder: "Ex: FR-123456", required: true },
      { id: "orderDate", label: "Date de commande", type: "date", required: true },
      { id: "amount", label: "Montant payé (€)", type: "number", placeholder: "€", required: true },
      { id: "expectedDate", label: "Date de livraison prévue", type: "date", required: true },
      { id: "orderStatus", label: "Statut affiché par le vendeur", type: "text", placeholder: "Ex: En préparation, Expédié...", required: true },
      { id: "carrier", label: "Transporteur (si connu)", type: "text", placeholder: "Ex: Colissimo, Chronopost...", required: false },
      { id: "trackingDetail", label: "Détail du suivi", type: "text", placeholder: "Ex: Bloqué à l'entrepôt...", required: true },
      { id: "prevContactDate", label: "Date du dernier contact avec le SAV", type: "date", required: false },
      { id: "requestType", label: "Votre demande", type: "radio", options: ["Livraison effective", "Remboursement intégral"], required: true },
      { id: "delayResponse", label: "Délai de réponse souhaité (jours)", type: "number", placeholder: "Ex: 14", required: true },
      { id: "phone", label: "Votre téléphone", type: "text", required: false },
    ],
    generateLetter: (d) => `
Objet : Réclamation – commande non reçue

Madame, Monsieur,

Je vous contacte au sujet de ma commande référencée ${d.orderNumber || '[NUMERO_COMMANDE]'}, passée le ${d.orderDate || '[DATE_COMMANDE]'} sur ${d.brand || '[NOM_ENSEIGNE]'}, pour un montant de ${d.amount || '[MONTANT]'} €.

À ce jour, je n'ai pas reçu cette commande, alors que la livraison était annoncée pour le ${d.expectedDate || '[DATE_LIVRAISON_PREVUE]'}.

Selon les informations dont je dispose à ce jour :

- statut de la commande : ${d.orderStatus || '[STATUT_COMMANDE]'}
- transporteur, si connu : ${d.carrier || 'Non communiqué'}
- suivi indiqué : ${d.trackingDetail || '[DETAIL_SUIVI]'}

${d.prevContactDate ? `J'ai déjà pris contact avec vos services le ${d.prevContactDate}, sans résolution satisfaisante à ce jour.` : ""}

Par la présente, je vous demande donc de bien vouloir :
${d.requestType === 'Remboursement intégral' ? `me rembourser intégralement la somme de ${d.amount} €` : `procéder à la livraison effective de la commande`}

Je vous remercie de bien vouloir me confirmer par écrit la prise en compte de ma demande et les suites apportées dans un délai de ${d.delayResponse || '14'} jours à compter de la réception du présent courrier.

À défaut de retour ou de résolution dans ce délai, je me réserve la possibilité d'engager les démarches appropriées pour faire valoir mes droits.

Cordialement,

${d.firstName} ${d.lastName}
${d.address}
${d.email}
${d.phone || ""}
    `.trim()
  },
  remboursement: {
    id: "remboursement",
    label: "Remboursement non effectué",
    icon: "🛒",
    color: "#2563EB",
    objective: "Réclamer un remboursement promis ou dû non versé.",
    fields: [
      { id: "brand", label: "Nom de l'enseigne", type: "text", required: true },
      { id: "orderNumber", label: "Numéro du dossier", type: "text", required: true },
      { id: "orderDate", label: "Date de la commande", type: "date", required: true },
      { id: "amount", label: "Montant à rembourser (€)", type: "number", required: true },
      { id: "situation", label: "Votre situation", type: "radio", options: ["Commande annulée", "Produit retourné", "Remboursement confirmé"], required: true },
      { id: "eventDate", label: "Date de l'événement (annulation/retour/promesse)", type: "date", required: true },
      { id: "relanceDetail", label: "Détail de vos relances ou promesse reçue", type: "text", placeholder: "Ex: Email du 12/03 confirmant le paiement...", required: true },
      { id: "delayResponse", label: "Délai de réponse souhaité (jours)", type: "number", placeholder: "14", required: true },
      { id: "phone", label: "Votre téléphone", type: "text", required: false },
    ],
    generateLetter: (d) => `
Objet : Réclamation – remboursement non effectué

Madame, Monsieur,

Je vous contacte au sujet de la commande / du dossier référencé ${d.orderNumber || '[NUMERO_DOSSIER]'}, passé le ${d.orderDate || '[DATE_COMMANDE]'} auprès de ${d.brand || '[NOM_ENSEIGNE]'}, pour un montant de ${d.amount || '[MONTANT]'} €.

Dans le cadre de ce dossier :

- ${d.situation === 'Commande annulée' ? 'la commande a été annulée' : d.situation === 'Produit retourné' ? 'le produit a été retourné' : 'un remboursement m\'a été confirmé'}
- date de l'événement concerné : ${d.eventDate || '[DATE_EVENEMENT]'}

À ce jour, je n'ai toujours pas reçu le remboursement attendu, malgré ${d.relanceDetail || '[DETAIL_RELANCES_OU_CONFIRMATION]'}.

Par la présente, je vous demande de procéder au remboursement de la somme de ${d.amount || '[MONTANT]'} € dans les meilleurs délais et de me confirmer par écrit la prise en compte de ma demande.

Je vous remercie de bien vouloir régulariser cette situation dans un délai de ${d.delayResponse || '14'} jours à compter de la réception du présent courrier.

À défaut de retour ou de régularisation dans ce délai, je me réserve la possibilité d'engager les démarches utiles pour obtenir l'exécution de ce remboursement.

Cordialement,

${d.firstName} ${d.lastName}
${d.address}
${d.email}
${d.phone || ""}
    `.trim()
  },
  transport: {
    id: "transport",
    label: "Transport annulé ou retardé",
    icon: "🚄",
    color: "#059669",
    objective: "Demander le remboursement d'un transport perturbé.",
    fields: [
      { id: "brand", label: "Nom de l'opérateur", type: "text", required: true },
      { id: "orderNumber", label: "Référence du trajet (Billet/Dossier)", type: "text", required: true },
      { id: "travelDate", label: "Date du trajet", type: "date", required: true },
      { id: "departure", label: "Ville de départ", type: "text", required: true },
      { id: "arrival", label: "Ville d'arrivée", type: "text", required: true },
      { id: "perturbation", label: "Nature de la perturbation", type: "radio", options: ["Annulé", "Retardé"], required: true },
      { id: "transportType", label: "Type de transport", type: "text", placeholder: "Ex: Vol AF123, Train TGV 6605...", required: true },
      { id: "delayDuration", label: "Durée du retard (si connue)", type: "text", placeholder: "Ex: 3h20", required: false },
      { id: "amount", label: "Montant payé (€)", type: "number", required: true },
      { id: "requestType", label: "Votre demande", type: "radio", options: ["Remboursement du billet", "Traitement de ma demande"], required: true },
      { id: "delayResponse", label: "Délai de réponse souhaité (jours)", type: "number", placeholder: "14", required: true },
      { id: "phone", label: "Votre téléphone", type: "text", required: false },
    ],
    generateLetter: (d) => `
Objet : Réclamation – demande de remboursement suite à un transport annulé ou retardé

Madame, Monsieur,

Je vous contacte au sujet du trajet référencé ${d.orderNumber || '[REFERENCE_TRAJET]'}, prévu le ${d.travelDate || '[DATE_TRAJET]'}, entre ${d.departure || '[VILLE_DEPART]'} et ${d.arrival || '[VILLE_ARRIVEE]'}, auprès de ${d.brand || '[NOM_OPERATEUR]'}.

Le transport concerné a été :
- ${d.perturbation === 'Annulé' ? 'annulé' : 'retardé'}

Précisions utiles :

- type de transport : ${d.transportType || '[TYPE_TRANSPORT]'}
- durée du retard, si connue : ${d.delayDuration || 'Non précisée'}
- montant payé : ${d.amount || '[MONTANT]'} €

Compte tenu de cette situation, je vous demande de bien vouloir procéder au ${d.requestType === 'Remboursement du billet' ? 'remboursement du billet' : 'traitement de ma demande de remboursement'} et de me confirmer par écrit la prise en compte de ce dossier.

Je vous remercie de bien vouloir m'indiquer les suites apportées dans un délai de ${d.delayResponse || '14'} jours à compter de la réception du présent courrier.

À défaut de retour ou de résolution dans ce délai, je me réserve la possibilité d'engager les démarches nécessaires pour poursuivre cette réclamation.

Cordialement,

${d.firstName} ${d.lastName}
${d.address}
${d.email}
${d.phone || ""}
    `.trim()
  },
  abonnement: {
    id: "abonnement",
    label: "Abonnement : résiliation ou prélèvements",
    icon: "📄",
    color: "#D97706",
    objective: "Stopper des prélèvements persistants après résiliation.",
    fields: [
      { id: "brand", label: "Nom du service", type: "text", required: true },
      { id: "orderNumber", label: "Référence d'abonnement / contrat", type: "text", required: true },
      { id: "subscribeDate", label: "Date de souscription", type: "date", required: true },
      { id: "resiliationDate", label: "Date de demande de résiliation", type: "date", required: true },
      { id: "mode", label: "Mode de demande (Email, RAR...)", type: "text", placeholder: "Ex: Recommandé avec AR", required: true },
      { id: "situation", label: "Constat actuel", type: "radio", options: ["Non prise en compte", "Prélèvements continus", "Reconduction non souhaitée"], required: true },
      { id: "amount", label: "Montant unitaire d'un prélèvement (€)", type: "number", required: true },
      { id: "count", label: "Nombre de prélèvements concernés", type: "number", required: true },
      { id: "totalRefund", label: "Montant total à rembourser (€)", type: "number", required: true },
      { id: "delayResponse", label: "Délai de réponse souhaité (jours)", type: "number", placeholder: "14", required: true },
      { id: "phone", label: "Votre téléphone", type: "text", required: false },
    ],
    generateLetter: (d) => `
Objet : Réclamation – résiliation d'abonnement / prélèvements persistants

Madame, Monsieur,

Je vous contacte au sujet de mon abonnement / contrat référencé ${d.orderNumber || '[REFERENCE_ABONNEMENT]'}, souscrit auprès de ${d.brand || '[NOM_SERVICE]'} le ${d.subscribeDate || '[DATE_SOUSCRIPTION]'}.

J'ai demandé la résiliation de cet abonnement le ${d.resiliationDate || '[DATE_DEMANDE_RESILIATION]'}, par ${d.mode || '[MODE_DEMANDE]'}.

Or, à ce jour :
- ${d.situation === 'Non prise en compte' ? 'la résiliation ne semble pas avoir été prise en compte' : d.situation === 'Prélèvements continus' ? 'des prélèvements continuent d\'être effectués' : 'une reconduction non souhaitée a été appliquée'}

Montant concerné : ${d.amount || '[MONTANT]'} €
Nombre de prélèvements concernés, si applicable : ${d.count || '[NOMBRE_PRELEVEMENTS]'}

Par la présente, je vous demande de bien vouloir :

1. prendre en compte immédiatement la résiliation de mon abonnement,
2. cesser tout prélèvement futur,
3. et, le cas échéant, me rembourser les sommes indûment prélevées pour un montant total de ${d.totalRefund || '[MONTANT_REMBOURSEMENT]'} €.

Je vous remercie de me confirmer par écrit la prise en compte de cette demande ainsi que la date effective de résiliation dans un délai de ${d.delayResponse || '14'} jours à compter de la réception du présent courrier.

À défaut de retour ou de régularisation dans ce délai, je me réserve la possibilité d'engager les démarches utiles pour faire valoir mes droits.

Cordialement,

${d.firstName} ${d.lastName}
${d.address}
${d.email}
${d.phone || ""}
    `.trim()
  },
};

export const RECIPIENTS = [
  { id: 1, name: "Amazon France", service: "Service Client / Réclamations", address: "67 Boulevard du Général Leclerc, 92110 Clichy", email: "contact@amazon.fr" },
  { id: 2, name: "Fnac", service: "Service Relation Client", address: "9 rue des Bateaux-Lavoirs, 94210 La Varenne Saint-Hilaire", email: "support@fnac.com" },
  { id: 3, name: "Darty", service: "Service Client Réclamations", address: "129 avenue de la République, 93300 Aubervilliers", email: "reclamation@darty.fr" },
  { id: 4, name: "SNCF Voyageurs", service: "Service Relation Client", address: "62973 ARRAS Cedex 9", email: "reclamations@sncf.com" },
  { id: 5, name: "Air France", service: "Service Client", address: "TSA 60033, 60035 Beauvais Cedex", email: "mail.reclamations.af@airfrance.fr" },
  { id: 6, name: "Basic Fit", service: "Service Adhésion", address: "Postbus 3124, 2130 KC Hoofddorp, Pays-Bas", email: "service.client@basic-fit.fr" },
  { id: 7, name: "Fitness Park", service: "Service Client", address: "12 rue de la Paix, 75002 Paris", email: "support@fitnesspark.fr" },
  { id: 8, name: "SFR", service: "Service Recours Consommateurs", address: "TSA 20102, 69947 Lyon Cedex 20", email: "support@sfr.fr" },
  { id: 9, name: "Orange", service: "Service Client Consommateurs", address: "33734 Bordeaux Cedex 9", email: "clientelle@orange.fr" },
  { id: 10, name: "Canal+", service: "Service Clients Canal+", address: "TSA 86712, 95905 Cergy-Pontoise Cedex 9", email: "servicesclients@canal-plus.com" },
  { id: 11, name: "Netflix", service: "Netflix Services France SAS", address: "19 rue de la Banque, 75002 Paris", email: "privacy@netflix.com" },
  { id: 12, name: "EDF", service: "EDF Service Clients", address: "TSA 21941, 62978 Arras Cedex 9", email: "espace-client@edf.fr" },
  { id: 13, name: "Engie", service: "Engie Service Clients", address: "TSA 87494, 76934 Rouen Cedex 09", email: "contact@engie.fr" },
  { id: 14, name: "Bouygues Telecom", service: "Bouygues Telecom Service Client", address: "60436 Noailles Cedex", email: "support@bouyguestelecom.fr" },
  { id: 15, name: "Free", service: "Free Résiliation", address: "75371 Paris Cedex 08", email: "client@free-mobile.fr" },
  { id: 16, name: "RED by SFR", service: "Service Client RED", address: "TSA 10101, 69947 Lyon Cedex 20", email: "red@sfr.fr" },
  { id: 17, name: "Cdiscount", service: "Service Client / SGPN", address: "BP 90200, 93472 Neuilly-sur-Marne", email: "mediateur@cdiscount.com" },
  { id: 18, name: "Boulanger", service: "Service Client", address: "Avenue de la Motte, 59810 Lesquin", email: "serviceclient@boulanger.com" },
];

export const STEP_LABELS = [
  "Votre situation",
  "Vos informations",
  "Votre réclamation",
  "Envoi et suivi"
];
