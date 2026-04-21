import Link from "next/link";
import styles from "./tarifs.module.css";

export default function TarifsPage() {
  return (
    <div className={styles.pricingPage}>
      {/* Header Minimaliste */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✓</span>
            <strong>RECOURS-CLIC</strong>
          </Link>
          <div className="header-actions">
            <Link href="/login" className="btn btn-outline btn-sm">Mon espace</Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <h1>Un prix unique, pour tous.</h1>
            <p>Pas d'abonnement caché, pas de frais de dossier. Juste une solution simple pour faire valoir vos droits.</p>
          </section>

          <section className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <span className={styles.planName}>Réclamation Simple</span>
              <div className={styles.price}>
                <span className={styles.amount}>2</span>
                <span className={styles.currency}>€</span>
                <span className={styles.period}>Par dossier de litige</span>
              </div>
              
              <ul className={styles.featuresList}>
                <li><span className={styles.checkIcon}>✓</span> Accès aux 4 modèles métiers</li>
                <li><span className={styles.checkIcon}>✓</span> Génération PDF illimitée</li>
                <li><span className={styles.checkIcon}>✓</span> Recherche automatique du destinataire</li>
                <li><span className={styles.checkIcon}>✓</span> Envoi par Email inclus</li>
                <li><span className={styles.checkIcon}>✓</span> Suivi dans votre espace client</li>
              </ul>

              <Link href="/tunnel?case=colis" className={`btn btn-primary btn-large ${styles.cta}`}>
                Commencer ma réclamation
              </Link>
            </div>
          </section>

          <section className={styles.trustSection}>
            <h2>Pourquoi nous faire confiance ?</h2>
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <h3>Transparence totale</h3>
                <p>2€ tout compris. Aucun prélèvement automatique n'est mis en place.</p>
              </div>
              <div className={styles.trustItem}>
                <h3>Conformité Juridique</h3>
                <p>Nos modèles sont rédigés selon les articles du Code de la consommation.</p>
              </div>
              <div className={styles.trustItem}>
                <h3>Support Réactif</h3>
                <p>Une question sur votre dossier ? Notre équipe vous répond sous 24h.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer minimal pour la page tarif */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '0.9rem' }}>
        &copy; 2026 Recours-Clic. Tous droits réservés.
      </footer>
    </div>
  );
}
