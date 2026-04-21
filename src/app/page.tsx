import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const cases = [
  {
    id: "colis",
    title: "Colis ou livraison non reçue",
    description: "Votre commande n'est jamais arrivée ? Formalisez votre réclamation.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    color: "#E11D48"
  },
  {
    id: "remboursement",
    title: "Remboursement non effectué",
    description: "Un remboursement vous a été promis ou est dû, mais rien n'a été versé ?",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
    color: "#2563EB"
  },
  {
    id: "transport",
    title: "Transport annulé ou retardé",
    description: "Vol, train ou trajet perturbé ? Faites valoir votre demande d'indemnisation.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="m15 2-3 3-3-3" />
      </svg>
    ),
    color: "#059669"
  },
  {
    id: "abonnement",
    title: "Abonnement : résiliation ou prélèvements",
    description: "Vous avez demandé à résilier, mais l'abonnement continue ? Formalisez votre demande.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    color: "#D97706"
  }
];

export default function Home() {
  return (
    <main className={styles.landingPage}>
      {/* Header */}
      <header className={styles.siteHeader}>
        <div className={`container ${styles.headerContent}`}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✓</span>
            <div className={styles.logoText}>
              <strong>RECOURS-CLIC</strong>
              <small>Votre réclamation. Notre moteur. Votre droit.</small>
            </div>
          </div>
          <nav className={styles.mainNav}>
            <Link href="#comment">Comment ça marche</Link>
            <Link href="#cas">Nos 4 cas</Link>
            <Link href="/tarifs">Tarifs</Link>
            <Link href="#aide">Aide</Link>
            <Link href="/login" className="btn btn-primary btn-sm">Mon espace</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <h1>Faites valoir vos droits, simplement.</h1>
            <p>Recours-Clic vous aide à formaliser votre réclamation et à l'envoyer au bon destinataire, rapidement et en toute sérénité.</p>
            <div className={styles.heroFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🛡️</span>
                <div>
                  <strong>Simple et rapide</strong>
                  <p>Un parcours guidé en quelques minutes</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📍</span>
                <div>
                  <strong>Au bon destinataire</strong>
                  <p>Nous trouvons l'adresse ou l'email du bon service</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔒</span>
                <div>
                  <strong>Sécurisé et traçable</strong>
                  <p>Votre démarche est envoyée et suivie</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
             <div className={styles.imageWrapper}>
                <Image 
                  src="/hero_recours_clic_v2_1776702550039.png" 
                  alt="Recours Clic" 
                  width={600} 
                  height={400} 
                  priority
                />
             </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className={styles.casesSection} id="cas">
        <div className="container">
          <h2 className={styles.sectionTitle}>Choisissez votre situation</h2>
          <div className={styles.casesGrid}>
            {cases.map((c) => (
              <Link href={`/tunnel?case=${c.id}`} key={c.id} className={styles.caseCard}>
                <div className={styles.caseIcon} style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                  {c.icon}
                </div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div className={styles.caseBtn}>Commencer la démarche</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Mints */}
      <section className={styles.mints}>
        <div className={`container ${styles.mintsFlex}`}>
           <div className={styles.mintItem}><span>✅</span> Sans engagement</div>
           <div className={styles.mintItem}><span>🔒</span> Paiement sécurisé</div>
           <div className={styles.mintItem}><span>⚖️</span> Conforme à la règlementation</div>
        </div>
      </section>
    </main>
  );
}
