// ═══════════════════════════════════════════════════════
//  specialties.js
//  Place this file in the SAME folder as TreatmentIndia.jsx
//  To add a specialty: add { name, icon, category } to the array below.
//  Categories are auto-generated — no other changes needed.
// ═══════════════════════════════════════════════════════

const specialties = [

  // ── General & Primary Care ──────────────────────────
  { name: "General Physician",                       icon: "🩺", category: "General & Primary Care" },
  { name: "Family Medicine Specialist",              icon: "🏠", category: "General & Primary Care" },
  { name: "Internal Medicine Specialist",            icon: "🩻", category: "General & Primary Care" },
  { name: "Preventive Medicine Specialist",          icon: "🛡️", category: "General & Primary Care" },
  { name: "Community Medicine Specialist",           icon: "🌍", category: "General & Primary Care" },
  { name: "Emergency Medicine Specialist",           icon: "🚨", category: "General & Primary Care" },
  { name: "Hospitalist",                             icon: "🏥", category: "General & Primary Care" },
  { name: "Primary Care Physician",                  icon: "⚕️", category: "General & Primary Care" },

  // ── Heart & Blood ────────────────────────────────────
  { name: "Cardiology (Cardiologist)",               icon: "❤️",  category: "Heart & Blood" },
  { name: "Interventional Cardiologist",             icon: "🫀",  category: "Heart & Blood" },
  { name: "Cardiac Electrophysiologist",             icon: "⚡",  category: "Heart & Blood" },
  { name: "Pediatric Cardiologist",                  icon: "👶",  category: "Heart & Blood" },
  { name: "Cardiothoracic Surgeon",                  icon: "🏥",  category: "Heart & Blood" },
  { name: "Vascular Surgeon",                        icon: "🩸",  category: "Heart & Blood" },
  { name: "Cardiac Surgeon",                         icon: "🏥",  category: "Heart & Blood" },
  { name: "Heart Failure Specialist",                icon: "💔",  category: "Heart & Blood" },

  // ── Brain & Nervous System ───────────────────────────
  { name: "Neurology (Neurologist)",                 icon: "🧠",  category: "Brain & Nervous System" },
  { name: "Neurosurgeon",                            icon: "🔬",  category: "Brain & Nervous System" },
  { name: "Pediatric Neurologist",                   icon: "👶",  category: "Brain & Nervous System" },
  { name: "Neurophysiologist",                       icon: "📡",  category: "Brain & Nervous System" },
  { name: "Stroke Specialist",                       icon: "🚨",  category: "Brain & Nervous System" },
  { name: "Neurocritical Care Specialist",           icon: "⚠️",  category: "Brain & Nervous System" },
  { name: "Epileptologist",                          icon: "⚡",  category: "Brain & Nervous System" },
  { name: "Neurointerventional Surgeon",             icon: "🩺",  category: "Brain & Nervous System" },

  // ── Bones & Muscles ──────────────────────────────────
  { name: "Orthopedics (Orthopedic Surgeon)",        icon: "🦴",  category: "Bones & Muscles" },
  { name: "Spine Surgeon",                           icon: "🦴",  category: "Bones & Muscles" },
  { name: "Sports Medicine Doctor",                  icon: "🏃",  category: "Bones & Muscles" },
  { name: "Joint Replacement Surgeon",               icon: "🔩",  category: "Bones & Muscles" },
  { name: "Hand Surgeon",                            icon: "🤲",  category: "Bones & Muscles" },
  { name: "Orthopedic Trauma Specialist",            icon: "🚑",  category: "Bones & Muscles" },
  { name: "Foot & Ankle Surgeon",                    icon: "🦶",  category: "Bones & Muscles" },

  // ── Child Health ─────────────────────────────────────
  { name: "Pediatrics (Pediatrician)",               icon: "👶",  category: "Child Health" },
  { name: "Neonatologist",                           icon: "🍼",  category: "Child Health" },
  { name: "Pediatric Surgeon",                       icon: "🏥",  category: "Child Health" },
  { name: "Pediatric Endocrinologist",               icon: "🧬",  category: "Child Health" },
  { name: "Pediatric Gastroenterologist",            icon: "🍽️", category: "Child Health" },
  { name: "Pediatric Hematologist",                  icon: "🩸",  category: "Child Health" },
  { name: "Pediatric Cardiologist",                  icon: "❤️",  category: "Child Health" },

  // ── Women's Health ───────────────────────────────────
  { name: "Gynecology (Gynecologist)",               icon: "⚕️",  category: "Women's Health" },
  { name: "Obstetrician",                            icon: "🤱",  category: "Women's Health" },
  { name: "Maternal-Fetal Medicine Specialist",      icon: "🫄",  category: "Women's Health" },
  { name: "Reproductive Endocrinologist",            icon: "🧬",  category: "Women's Health" },
  { name: "Fertility Specialist",                    icon: "🌱",  category: "Women's Health" },
  { name: "Gynecologic Oncologist",                  icon: "🎗️", category: "Women's Health" },
  { name: "Urogynecologist",                         icon: "🩺",  category: "Women's Health" },

  // ── Eye Care ─────────────────────────────────────────
  { name: "Ophthalmology (Ophthalmologist)",         icon: "👁️", category: "Eye Care" },
  { name: "Retina Specialist",                       icon: "👁️", category: "Eye Care" },
  { name: "Cornea Specialist",                       icon: "🔍",  category: "Eye Care" },
  { name: "Glaucoma Specialist",                     icon: "🌡️", category: "Eye Care" },
  { name: "Pediatric Ophthalmologist",               icon: "👶",  category: "Eye Care" },
  { name: "Oculoplastic Surgeon",                    icon: "✂️",  category: "Eye Care" },
  { name: "Neuro-Ophthalmologist",                   icon: "🧠",  category: "Eye Care" },

  // ── Ear, Nose & Throat ───────────────────────────────
  { name: "Otolaryngology (ENT Specialist)",         icon: "👂",  category: "Ear, Nose & Throat" },
  { name: "Otologist",                               icon: "👂",  category: "Ear, Nose & Throat" },
  { name: "Rhinologist",                             icon: "👃",  category: "Ear, Nose & Throat" },
  { name: "Laryngologist",                           icon: "🗣️", category: "Ear, Nose & Throat" },
  { name: "Head & Neck Surgeon",                     icon: "🏥",  category: "Ear, Nose & Throat" },
  { name: "Pediatric ENT Specialist",                icon: "👶",  category: "Ear, Nose & Throat" },

  // ── Chest & Respiratory ──────────────────────────────
  { name: "Pulmonology (Pulmonologist)",             icon: "🫁",  category: "Chest & Respiratory" },
  { name: "Critical Care Specialist",                icon: "⚠️",  category: "Chest & Respiratory" },
  { name: "Sleep Medicine Specialist",               icon: "😴",  category: "Chest & Respiratory" },
  { name: "Respiratory Medicine Specialist",         icon: "💨",  category: "Chest & Respiratory" },
  { name: "Pulmonary Hypertension Specialist",       icon: "🫀",  category: "Chest & Respiratory" },

  // ── Digestive System ─────────────────────────────────
  { name: "Gastroenterology (Gastroenterologist)",   icon: "🍽️", category: "Digestive System" },
  { name: "Hepatologist",                            icon: "🟤",  category: "Digestive System" },
  { name: "Colorectal Surgeon",                      icon: "🏥",  category: "Digestive System" },
  { name: "Pancreatic Specialist",                   icon: "🔬",  category: "Digestive System" },
  { name: "Bariatric Surgeon",                       icon: "⚖️",  category: "Digestive System" },

  // ── Hormones & Metabolism ────────────────────────────
  { name: "Endocrinology (Endocrinologist)",         icon: "🧬",  category: "Hormones & Metabolism" },
  { name: "Diabetologist",                           icon: "💉",  category: "Hormones & Metabolism" },
  { name: "Thyroid Specialist",                      icon: "🦋",  category: "Hormones & Metabolism" },
  { name: "Metabolic Disease Specialist",            icon: "⚗️",  category: "Hormones & Metabolism" },

  // ── Skin & Cosmetic ──────────────────────────────────
  { name: "Dermatology (Dermatologist)",             icon: "🌿",  category: "Skin & Cosmetic" },
  { name: "Cosmetic Dermatologist",                  icon: "✨",  category: "Skin & Cosmetic" },
  { name: "Plastic Surgeon",                         icon: "💎",  category: "Skin & Cosmetic" },
  { name: "Aesthetic Medicine Specialist",           icon: "🪞",  category: "Skin & Cosmetic" },
  { name: "Trichologist",                            icon: "💇",  category: "Skin & Cosmetic" },
  { name: "Dermatopathologist",                      icon: "🔬",  category: "Skin & Cosmetic" },
  { name: "Cosmetic Surgeon",                        icon: "✨",  category: "Skin & Cosmetic" },
  { name: "Craniofacial Surgeon",                    icon: "🏥",  category: "Skin & Cosmetic" },

  // ── Cancer & Blood ───────────────────────────────────
  { name: "Oncology (Oncologist)",                   icon: "🎗️", category: "Cancer & Blood" },
  { name: "Radiation Oncologist",                    icon: "☢️",  category: "Cancer & Blood" },
  { name: "Surgical Oncologist",                     icon: "🏥",  category: "Cancer & Blood" },
  { name: "Hematologist",                            icon: "🩸",  category: "Cancer & Blood" },
  { name: "Hematologic Oncologist",                  icon: "🔬",  category: "Cancer & Blood" },

  // ── Mental Health ────────────────────────────────────
  { name: "Psychiatry (Psychiatrist)",               icon: "🧠",  category: "Mental Health" },
  { name: "Child Psychiatrist",                      icon: "👶",  category: "Mental Health" },
  { name: "Addiction Medicine Specialist",           icon: "💊",  category: "Mental Health" },
  { name: "Geriatric Psychiatrist",                  icon: "👴",  category: "Mental Health" },
  { name: "Neuropsychiatrist",                       icon: "🔬",  category: "Mental Health" },

  // ── Kidney & Urinary ─────────────────────────────────
  { name: "Nephrologist",                            icon: "🫘",  category: "Kidney & Urinary" },
  { name: "Urologist",                               icon: "🩺",  category: "Kidney & Urinary" },
  { name: "Pediatric Urologist",                     icon: "👶",  category: "Kidney & Urinary" },
  { name: "Urogynecologist",                         icon: "⚕️",  category: "Kidney & Urinary" },

  // ── Diagnostic & Imaging ─────────────────────────────
  { name: "Pathologist",                             icon: "🔬",  category: "Diagnostic & Imaging" },
  { name: "Clinical Pathologist",                    icon: "🧪",  category: "Diagnostic & Imaging" },
  { name: "Molecular Pathologist",                   icon: "🧬",  category: "Diagnostic & Imaging" },
  { name: "Radiologist",                             icon: "🩻",  category: "Diagnostic & Imaging" },
  { name: "Interventional Radiologist",              icon: "📡",  category: "Diagnostic & Imaging" },
  { name: "Nuclear Medicine Specialist",             icon: "☢️",  category: "Diagnostic & Imaging" },
  { name: "Diagnostic Radiologist",                  icon: "🩻",  category: "Diagnostic & Imaging" },
  { name: "Neuroradiologist",                        icon: "🧠",  category: "Diagnostic & Imaging" },
  { name: "Pediatric Radiologist",                   icon: "👶",  category: "Diagnostic & Imaging" },
  { name: "Musculoskeletal Radiologist",             icon: "🦴",  category: "Diagnostic & Imaging" },
  { name: "Abdominal Radiologist",                   icon: "🔍",  category: "Diagnostic & Imaging" },
  { name: "Thoracic Radiologist",                    icon: "🫁",  category: "Diagnostic & Imaging" },
  { name: "Interventional Neuroradiologist",         icon: "🧠",  category: "Diagnostic & Imaging" },

  // ── Surgical Specialties ─────────────────────────────
  { name: "General Surgeon",                         icon: "🏥",  category: "Surgical Specialties" },
  { name: "Laparoscopic Surgeon",                    icon: "🏥",  category: "Surgical Specialties" },
  { name: "Trauma Surgeon",                          icon: "🚑",  category: "Surgical Specialties" },
  { name: "Transplant Surgeon",                      icon: "💗",  category: "Surgical Specialties" },
  { name: "Endocrine Surgeon",                       icon: "🧬",  category: "Surgical Specialties" },
  { name: "Hepatobiliary Surgeon",                   icon: "🏥",  category: "Surgical Specialties" },
  { name: "Burn Specialist",                         icon: "🔥",  category: "Surgical Specialties" },
  { name: "Trauma Medicine Specialist",              icon: "🚑",  category: "Surgical Specialties" },

  // ── Anesthesiology ───────────────────────────────────
  { name: "Anesthesiologist",                        icon: "💉",  category: "Anesthesiology" },
  { name: "Pediatric Anesthesiologist",              icon: "👶",  category: "Anesthesiology" },
  { name: "Cardiac Anesthesiologist",                icon: "❤️",  category: "Anesthesiology" },
  { name: "Neuroanesthesiologist",                   icon: "🧠",  category: "Anesthesiology" },
  { name: "Critical Care Anesthesiologist",          icon: "⚠️",  category: "Anesthesiology" },
  { name: "Pain Management Specialist",              icon: "💊",  category: "Anesthesiology" },
  { name: "Pain Medicine Specialist",                icon: "💊",  category: "Anesthesiology" },

  // ── Rehabilitation & Therapy ─────────────────────────
  { name: "Physical Medicine & Rehabilitation",      icon: "🏋️", category: "Rehabilitation & Therapy" },
  { name: "Physiotherapist",                         icon: "🤸",  category: "Rehabilitation & Therapy" },
  { name: "Occupational Therapist",                  icon: "🛠️", category: "Rehabilitation & Therapy" },
  { name: "Speech Therapist",                        icon: "🗣️", category: "Rehabilitation & Therapy" },
  { name: "Pain Rehabilitation Specialist",          icon: "💆",  category: "Rehabilitation & Therapy" },
  { name: "Neurorehabilitation Specialist",          icon: "🧠",  category: "Rehabilitation & Therapy" },
  { name: "Brain Injury Specialist",                 icon: "🧠",  category: "Rehabilitation & Therapy" },
  { name: "Rehabilitation Medicine Specialist",      icon: "🏋️", category: "Rehabilitation & Therapy" },

  // ── Palliative & Geriatric Care ──────────────────────
  { name: "Palliative Care Specialist",              icon: "🕊️", category: "Palliative & Geriatric Care" },
  { name: "Geriatrician",                            icon: "👴",  category: "Palliative & Geriatric Care" },
  { name: "Hospice Care Specialist",                 icon: "🏡",  category: "Palliative & Geriatric Care" },
  { name: "Long-Term Care Specialist",               icon: "🏠",  category: "Palliative & Geriatric Care" },

  // ── Public Health ────────────────────────────────────
  { name: "Epidemiologist",                          icon: "🌍",  category: "Public Health" },
  { name: "Public Health Specialist",                icon: "🏛️", category: "Public Health" },
  { name: "Tropical Medicine Specialist",            icon: "🌴",  category: "Public Health" },
  { name: "Global Health Specialist",                icon: "🌐",  category: "Public Health" },
  { name: "Occupational Medicine Specialist",        icon: "🏗️", category: "Public Health" },
  { name: "Environmental Medicine Specialist",       icon: "🌿",  category: "Public Health" },
  { name: "Travel Medicine Specialist",              icon: "✈️",  category: "Public Health" },
  { name: "Wilderness Medicine Specialist",          icon: "🏕️", category: "Public Health" },
  { name: "Military Medicine Specialist",            icon: "🎖️", category: "Public Health" },
  { name: "Disaster Medicine Specialist",            icon: "🆘",  category: "Public Health" },
  { name: "Aviation Medicine Specialist",            icon: "✈️",  category: "Public Health" },
  { name: "Aerospace Medicine Specialist",           icon: "🚀",  category: "Public Health" },
  { name: "Space Medicine Specialist",               icon: "🌌",  category: "Public Health" },
  { name: "Diving Medicine Specialist",              icon: "🤿",  category: "Public Health" },
  { name: "Hyperbaric Medicine Specialist",          icon: "🫧",  category: "Public Health" },

  // ── Advanced Subspecialties ──────────────────────────
  { name: "Immunologist",                            icon: "🛡️", category: "Advanced Subspecialties" },
  { name: "Allergist",                               icon: "🌸",  category: "Advanced Subspecialties" },
  { name: "Clinical Immunologist",                   icon: "🔬",  category: "Advanced Subspecialties" },
  { name: "Transfusion Medicine Specialist",         icon: "🩸",  category: "Advanced Subspecialties" },
  { name: "Regenerative Medicine Specialist",        icon: "🌱",  category: "Advanced Subspecialties" },
  { name: "Stem Cell Therapy Specialist",            icon: "🧬",  category: "Advanced Subspecialties" },
  { name: "Clinical Pharmacologist",                 icon: "💊",  category: "Advanced Subspecialties" },
  { name: "Medical Geneticist",                      icon: "🧬",  category: "Advanced Subspecialties" },
  { name: "Toxicologist",                            icon: "⚗️",  category: "Advanced Subspecialties" },
  { name: "Forensic Medicine Specialist",            icon: "🔍",  category: "Advanced Subspecialties" },

  // ── Neurology Subspecialties ─────────────────────────
  { name: "Movement Disorder Specialist",            icon: "🏃",  category: "Neurology Subspecialties" },
  { name: "Neuromuscular Specialist",                icon: "💪",  category: "Neurology Subspecialties" },
  { name: "Headache Specialist",                     icon: "🤕",  category: "Neurology Subspecialties" },
  { name: "Sleep Neurologist",                       icon: "😴",  category: "Neurology Subspecialties" },
  { name: "Cognitive Neurologist",                   icon: "🧠",  category: "Neurology Subspecialties" },
  { name: "Pain Neurologist",                        icon: "⚡",  category: "Neurology Subspecialties" },
  { name: "Autonomic Disorder Specialist",           icon: "🔬",  category: "Neurology Subspecialties" },
  { name: "Balance Disorder Specialist",             icon: "⚖️",  category: "Neurology Subspecialties" },
  { name: "Vestibular Specialist",                   icon: "🌀",  category: "Neurology Subspecialties" },
  { name: "Functional Neurologist",                  icon: "🧠",  category: "Neurology Subspecialties" },

  // ── Orthopedic Subspecialties ────────────────────────
  { name: "Pediatric Orthopedic Surgeon",            icon: "👶",  category: "Orthopedic Subspecialties" },
  { name: "Orthopedic Oncologist",                   icon: "🎗️", category: "Orthopedic Subspecialties" },
  { name: "Shoulder Specialist",                     icon: "💪",  category: "Orthopedic Subspecialties" },
  { name: "Hip Specialist",                          icon: "🦴",  category: "Orthopedic Subspecialties" },
  { name: "Orthopedic Spine Specialist",             icon: "🦴",  category: "Orthopedic Subspecialties" },
  { name: "Sports Injury Specialist",                icon: "🏃",  category: "Orthopedic Subspecialties" },

  // ── Lab & Research Medicine ──────────────────────────
  { name: "Clinical Microbiologist",                 icon: "🦠",  category: "Lab & Research Medicine" },
  { name: "Virologist",                              icon: "🦠",  category: "Lab & Research Medicine" },
  { name: "Parasitologist",                          icon: "🔬",  category: "Lab & Research Medicine" },
  { name: "Bacteriologist",                          icon: "🧫",  category: "Lab & Research Medicine" },

  // ── Genetics & Molecular Medicine ───────────────────
  { name: "Cytogeneticist",                          icon: "🧬",  category: "Genetics & Molecular Medicine" },
  { name: "Molecular Geneticist",                    icon: "🔬",  category: "Genetics & Molecular Medicine" },
  { name: "Genomic Medicine Specialist",             icon: "🧬",  category: "Genetics & Molecular Medicine" },
  { name: "Genetic Counseling Specialist",           icon: "🧬",  category: "Genetics & Molecular Medicine" },
  { name: "Precision Medicine Specialist",           icon: "🎯",  category: "Genetics & Molecular Medicine" },

  // ── Emerging Medical Fields ──────────────────────────
  { name: "Telemedicine Specialist",                 icon: "📱",  category: "Emerging Medical Fields" },
  { name: "Lifestyle Medicine Specialist",           icon: "🌿",  category: "Emerging Medical Fields" },
  { name: "Integrative Medicine Specialist",         icon: "☯️",  category: "Emerging Medical Fields" },
  { name: "Functional Medicine Specialist",          icon: "🔬",  category: "Emerging Medical Fields" },

  // ── Special Care ─────────────────────────────────────
  { name: "Adolescent Medicine Specialist",          icon: "🧑",  category: "Special Care" },
  { name: "Men's Health Specialist",                 icon: "🧔",  category: "Special Care" },
  { name: "Women's Health Specialist",               icon: "👩",  category: "Special Care" },
  { name: "Sexual Health Specialist",                icon: "🩺",  category: "Special Care" },
  { name: "Reproductive Medicine Specialist",        icon: "🌱",  category: "Special Care" },
  { name: "Lactation Medicine Specialist",           icon: "🤱",  category: "Special Care" },
  { name: "Nutrition Medicine Specialist",           icon: "🥗",  category: "Special Care" },
  { name: "Clinical Nutritionist",                   icon: "🥦",  category: "Special Care" },
  { name: "Obesity Medicine Specialist",             icon: "⚖️",  category: "Special Care" },
  { name: "Bariatric Medicine Specialist",           icon: "🏥",  category: "Special Care" },
  { name: "Sleep Disorder Specialist",               icon: "😴",  category: "Special Care" },

];

// Auto-generates category list — do NOT edit this line
const categories = ["All", ...Array.from(new Set(specialties.map(function(s){ return s.category; })))];

export { specialties, categories };
export default specialties;