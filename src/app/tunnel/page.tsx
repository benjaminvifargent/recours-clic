"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CASES, RECIPIENTS, STEP_LABELS } from "@/lib/data";
import { useAuth } from "@/lib/AuthContext";
import { downloadLetterPDF } from "@/lib/pdf";
import styles from "./tunnel.module.css";

function TunnelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const caseId = searchParams.get("case") || "colis";
  
  const currentCase = CASES[caseId] || CASES.colis;

  const [step, setStep] = useState(1);
  const [entities, setEntities] = useState(RECIPIENTS);
  const [formData, setFormData] = useState<any>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: "",
  });

  // Sync with Admin Config
  useEffect(() => {
    const saved = localStorage.getItem("recours_clic_recipients");
    if (saved) {
      setEntities(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const initialFields: any = {};
    currentCase.fields.forEach(f => {
      initialFields[f.id] = f.type === "radio" ? f.options?.[0] : "";
    });
    setFormData((prev: any) => ({ ...prev, ...initialFields }));
  }, [caseId, currentCase]);

  const nextStep = () => {
    // If we are at step 2 and user is not logged in, we stay but normally we should allow continue
    setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const saveClaim = () => {
    const newClaim = {
      id: `RC-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: `${currentCase.label} - ${formData.brand || 'Entreprise'}`,
      date: new Date().toLocaleDateString('fr-FR'),
      status: "Envoyé",
      statusColor: "#22c55e",
      caseId: currentCase.id,
      letter: currentCase.generateLetter(formData)
    };

    const existing = JSON.parse(localStorage.getItem("recours_clic_claims") || "[]");
    localStorage.setItem("recours_clic_claims", JSON.stringify([newClaim, ...existing]));
  };

  const handleFinish = () => {
    saveClaim();
    setStep(5);
  };

  const handleCaseChange = () => {
    router.push("/");
  };

  const generatedLetter = currentCase.generateLetter(formData);

  return (
    <div className={styles.tunnelContainer}>
      <header className={styles.tunnelHeader}>
        <div className={`container ${styles.tunnelHeaderContent}`}>
          <Link href="/" className={styles.tunnelLogo}>
             <span className={styles.logoIcon}>✓</span>
             <strong>RECOURS-CLIC</strong>
          </Link>
          <div className={styles.stepper}>
            {STEP_LABELS.map((label, idx) => (
              <div key={label} className={`${styles.stepItem} ${step > idx + 1 ? styles.completed : ''} ${step === idx + 1 ? styles.active : ''}`}>
                <div className={styles.stepNumber}>{idx + 1}</div>
                <div className={styles.stepLabel}>{label}</div>
              </div>
            ))}
          </div>
          <div className="header-actions">
             {user ? (
               <Link href="/dashboard" className="btn btn-outline btn-sm">Mon espace</Link>
             ) : (
               <Link href="/login" className="btn btn-outline btn-sm">Connexion</Link>
             )}
          </div>
        </div>
      </header>

      <main className={styles.tunnelMain}>
        <div className={`container ${styles.tunnelGrid}`}>
          <aside className={styles.tunnelSidebar}>
            <div className={styles.sidebarCard}>
              <h3>Votre situation</h3>
              <div className={styles.caseBadge}>
                <span className={styles.caseBadgeIcon}>{currentCase.icon}</span>
                <span className={styles.caseBadgeLabel}>{currentCase.label}</span>
              </div>
              <button onClick={handleCaseChange} className={styles.changeLink}>Changer de situation</button>
            </div>
            <div className={styles.sidebarInfo}>
              <h4>Pourquoi ces informations ?</h4>
              <p>Elles nous permettent de rédiger une réclamation adaptée.</p>
            </div>
            <div className={styles.sidebarSecurity}>
               <span>🔒</span> Sécurisé et confidentiel.
            </div>
          </aside>

          <section className={styles.tunnelFormArea}>
            {step === 1 && (
              <div className={styles.stepView}>
                <h1>1. Décrivez votre situation</h1>
                <p className={styles.stepIntro}>Questions spécifiques au cas : {currentCase.label}</p>
                <div className={styles.dynamicFields}>
                  {currentCase.fields.map(field => (
                    <div className={styles.formGroup} key={field.id}>
                      <label>{field.label}</label>
                      {field.type === "radio" ? (
                        <div className={styles.radioGroup}>
                          {field.options?.map(opt => (
                            <label className={styles.radioItem} key={opt}>
                              <input type="radio" name={field.id} value={opt} checked={formData[field.id] === opt} onChange={(e) => handleInputChange(field.id, e.target.value)} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === "select" ? (
                        <select className={styles.formSelect} value={formData[field.id]} onChange={(e) => handleInputChange(field.id, e.target.value)}>
                          <option value="">Sélectionnez...</option>
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} className={styles.formInput} placeholder={field.placeholder} value={formData[field.id] || ""} onChange={(e) => handleInputChange(field.id, e.target.value)} />
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.formActions}>
                  <button onClick={nextStep} className="btn btn-primary btn-large">Continuer <span>→</span></button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepView}>
                <h1>2. Vos informations</h1>
                <p className={styles.stepIntro}>Vérifiez vos coordonnées personnelles.</p>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Prénom</label>
                    <input type="text" className={styles.formInput} placeholder="Ex: Jean" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Nom</label>
                    <input type="text" className={styles.formInput} placeholder="Ex: Dupont" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" className={styles.formInput} placeholder="votre@email.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Adresse postale complète</label>
                  <input type="text" className={styles.formInput} placeholder="Numéro, rue, CP, ville" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                </div>
                <div className={styles.formActions}>
                  <button onClick={prevStep} className="btn btn-outline">Retour</button>
                  <button onClick={nextStep} className="btn btn-primary btn-large">Suivant <span>→</span></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepView}>
                <h1>3. Votre réclamation</h1>
                <p className={styles.stepIntro}>Aperçu du destinataire et du courrier.</p>
                <div className={styles.recipientValidation}>
                  <div className={styles.recipientCard}>
                    <div className={styles.recipientInfo}>
                       <strong>{formData.brand || "Enseigne"}</strong>
                       <p>Service Client / Réclamations</p>
                    </div>
                    <button className="btn btn-outline btn-sm">Modifier</button>
                  </div>
                </div>
                <div className={styles.letterPreview}>
                  <div className={styles.letterHeader}><h3>Aperçu du courrier</h3></div>
                  <div className={styles.letterBody}><pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'serif' }}>{generatedLetter}</pre></div>
                </div>
                <div className={styles.formActions}>
                  <button onClick={prevStep} className="btn btn-outline">Retour</button>
                  <button onClick={nextStep} className="btn btn-primary btn-large">Choisir l'envoi <span>→</span></button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={styles.stepView}>
                <h1>4. Envoi et suivi</h1>
                <div className={styles.sendingOptions}>
                   <div className={`${styles.optionCard} ${styles.active}`}>
                      <div className={styles.optionHeader}><strong>Envoi par Email</strong> <span className={styles.price}>Gratuit</span></div>
                      <p>Envoyé immédiatement au service réclamation.</p>
                   </div>
                </div>
                <div className={styles.formActions}>
                  <button onClick={handleFinish} className="btn btn-primary btn-large">Confirmer et envoyer</button>
                </div>
              </div>
            )}

            {step === 5 && (
               <div className={styles.successView}>
                  <div className={styles.successIcon}>🎉</div>
                  <h1>Demande envoyée !</h1>
                  <p>Votre dossier a été enregistré dans votre espace.</p>
                  <div className={styles.formActions}>
                    <Link href="/" className="btn btn-primary">Retour à l'accueil</Link>
                    <button 
                      onClick={() => downloadLetterPDF(generatedLetter, `reclamation_${currentCase.id}.pdf`)} 
                      className="btn btn-outline"
                    >
                      📥 Télécharger mon PDF
                    </button>
                    <Link href="/dashboard" className="btn btn-outline">Voir mon dossier</Link>
                  </div>
               </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function TunnelPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <TunnelContent />
    </Suspense>
  );
}
