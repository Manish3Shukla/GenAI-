// LegalAI - Document Demystification Tool
// Main JavaScript functionality

class LegalAI {
    constructor() {
        this.uploadedFiles = [];
        this.analysisResults = null;
        this.chatHistory = [];
        this.translations = this.getTranslations();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupMobileNavigation();
        this.setupFileUpload();
        this.setupChatInterface();
        this.setupContactForm();
        this.setupThemeToggle();
        this.setupLanguageSelector();
    }

    // Event Listeners
    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.updateNavbarBackground();
        });
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking on theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        }
    }

    // File Upload Functionality
    setupFileUpload() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const uploadProgress = document.getElementById('upload-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            this.handleFileUpload(files);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
    }

    async handleFileUpload(files) {
        if (files.length === 0) return;

        const uploadProgress = document.getElementById('upload-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        uploadProgress.style.display = 'block';

        try {
            // Simulate file upload progress
            for (let i = 0; i <= 100; i += 10) {
                progressFill.style.width = i + '%';
                progressText.textContent = `Uploading... ${i}%`;
                await this.delay(100);
            }

            // Store uploaded files
            this.uploadedFiles = Array.from(files);
            
            // Simulate AI analysis
            progressText.textContent = 'Analyzing document...';
            await this.delay(2000);

            // Generate analysis results
            this.analysisResults = this.generateAnalysisResults(files[0]);
            
            // Show results
            this.showAnalysisResults();
            
            // Hide progress
            uploadProgress.style.display = 'none';

        } catch (error) {
            console.error('Upload error:', error);
            progressText.textContent = 'Upload failed. Please try again.';
        }
    }

    generateAnalysisResults(file) {
        // Simulate AI analysis with realistic data
        const fileName = file.name.toLowerCase();
        let documentType = 'Legal Document';
        let complexity = 'Medium';
        let riskLevel = 'Low';

        if (fileName.includes('rental') || fileName.includes('lease')) {
            documentType = 'Rental Agreement';
            complexity = 'High';
            riskLevel = 'Medium';
        } else if (fileName.includes('loan') || fileName.includes('credit')) {
            documentType = 'Loan Contract';
            complexity = 'High';
            riskLevel = 'High';
        } else if (fileName.includes('terms') || fileName.includes('service')) {
            documentType = 'Terms of Service';
            complexity = 'Medium';
            riskLevel = 'Low';
        }

        return {
            documentType,
            complexity,
            riskLevel,
            summary: this.generateDocumentSummary(documentType),
            clauses: this.generateClauses(documentType),
            risks: this.generateRiskAssessment(documentType, riskLevel),
            keyPoints: this.generateKeyPoints(documentType)
        };
    }

    generateDocumentSummary(type) {
        const summaries = {
            'Rental Agreement': 'This is a rental agreement between you (tenant) and the property owner (landlord). The agreement outlines your rights and responsibilities as a tenant, including payment terms, property maintenance, and lease duration. It also specifies the landlord\'s obligations and the conditions for lease termination.',
            'Loan Contract': 'This document is a loan agreement that outlines the terms and conditions of borrowing money. It includes the loan amount, interest rate, repayment schedule, and consequences of default. The contract also specifies collateral requirements and the lender\'s rights.',
            'Terms of Service': 'This document contains the terms and conditions for using a service or platform. It outlines user rights and responsibilities, service limitations, data usage policies, and dispute resolution procedures.',
            'Legal Document': 'This legal document contains important terms and conditions that affect your rights and obligations. It may include clauses related to payments, responsibilities, termination conditions, and legal remedies.'
        };
        return summaries[type] || summaries['Legal Document'];
    }

    generateClauses(type) {
        const clauseTemplates = {
            'Rental Agreement': [
                {
                    title: 'Payment Terms',
                    type: 'important',
                    explanation: 'You must pay rent on the 1st of each month. Late fees of $50 apply after 5 days. Payment methods include check, money order, or electronic transfer.'
                },
                {
                    title: 'Security Deposit',
                    type: 'warning',
                    explanation: 'A security deposit of $1,500 is required before move-in. This deposit may be used for damages, unpaid rent, or cleaning costs beyond normal wear and tear.'
                },
                {
                    title: 'Property Maintenance',
                    type: 'important',
                    explanation: 'You are responsible for minor maintenance like changing light bulbs and keeping the property clean. The landlord handles major repairs and structural issues.'
                },
                {
                    title: 'Lease Termination',
                    type: 'important',
                    explanation: 'Either party can terminate the lease with 30 days written notice. Early termination may require payment of remaining rent or finding a replacement tenant.'
                }
            ],
            'Loan Contract': [
                {
                    title: 'Interest Rate',
                    type: 'warning',
                    explanation: 'The annual interest rate is 7.5% APR. Interest is calculated daily and added to your monthly payment. Rate may change based on market conditions.'
                },
                {
                    title: 'Repayment Schedule',
                    type: 'important',
                    explanation: 'Monthly payments of $450 are due on the 15th of each month. The loan term is 5 years with a total of 60 payments.'
                },
                {
                    title: 'Default Consequences',
                    type: 'warning',
                    explanation: 'Missing payments may result in late fees, credit reporting, and potential legal action. Default may trigger acceleration of the entire loan balance.'
                },
                {
                    title: 'Collateral',
                    type: 'important',
                    explanation: 'The loan is secured by your vehicle. The lender may repossess the vehicle if you default on payments.'
                }
            ],
            'Terms of Service': [
                {
                    title: 'User Responsibilities',
                    type: 'important',
                    explanation: 'You must use the service lawfully and not violate any terms. You are responsible for maintaining the security of your account and password.'
                },
                {
                    title: 'Data Usage',
                    type: 'warning',
                    explanation: 'We collect and use your data as described in our privacy policy. Your data may be shared with third parties for service improvement.'
                },
                {
                    title: 'Service Limitations',
                    type: 'important',
                    explanation: 'The service is provided "as is" without warranties. We may limit or suspend service for violations or maintenance.'
                },
                {
                    title: 'Dispute Resolution',
                    type: 'important',
                    explanation: 'Disputes will be resolved through binding arbitration. You waive the right to participate in class action lawsuits.'
                }
            ]
        };
        return clauseTemplates[type] || clauseTemplates['Terms of Service'];
    }

    generateRiskAssessment(type, riskLevel) {
        const riskTemplates = {
            'Rental Agreement': [
                {
                    level: 'high',
                    title: 'High Late Fee',
                    description: '$100 late fee after 5 days may be excessive compared to local standards'
                },
                {
                    level: 'medium',
                    title: 'Maintenance Responsibility',
                    description: 'Tenant responsible for minor repairs could include expensive items'
                },
                {
                    level: 'low',
                    title: 'Security Deposit',
                    description: 'Standard security deposit amount for the area'
                }
            ],
            'Loan Contract': [
                {
                    level: 'high',
                    title: 'Variable Interest Rate',
                    description: 'Interest rate can increase, potentially doubling your monthly payment'
                },
                {
                    level: 'high',
                    title: 'Prepayment Penalty',
                    description: 'Early loan payoff incurs a 2% penalty fee'
                },
                {
                    level: 'medium',
                    title: 'Default Acceleration',
                    description: 'Missing one payment triggers immediate demand for full balance'
                }
            ],
            'Terms of Service': [
                {
                    level: 'medium',
                    title: 'Data Sharing',
                    description: 'Personal data may be sold to third parties without explicit consent'
                },
                {
                    level: 'low',
                    title: 'Service Changes',
                    description: 'Terms can be modified with 30 days notice'
                }
            ]
        };
        return riskTemplates[type] || riskTemplates['Terms of Service'];
    }

    generateKeyPoints(type) {
        const keyPoints = {
            'Rental Agreement': [
                'Monthly rent: $1,200 due on the 1st',
                'Security deposit: $1,500',
                'Lease term: 12 months',
                'Late fee: $50 after 5 days',
                'Pet policy: No pets allowed'
            ],
            'Loan Contract': [
                'Loan amount: $25,000',
                'Interest rate: 7.5% APR',
                'Monthly payment: $450',
                'Loan term: 5 years',
                'Collateral: Vehicle title'
            ],
            'Terms of Service': [
                'Account required for service access',
                'Data collection for service improvement',
                'No warranty on service availability',
                'Arbitration for disputes',
                'Terms can be modified with notice'
            ]
        };
        return keyPoints[type] || keyPoints['Terms of Service'];
    }

    showAnalysisResults() {
        const analysisSection = document.getElementById('analysis');
        const results = this.analysisResults;

        // Update document summary
        document.getElementById('doc-type').textContent = results.documentType;
        document.getElementById('complexity').textContent = results.complexity;
        document.getElementById('key-points').textContent = `${results.keyPoints.length} identified`;
        document.getElementById('risk-factors').textContent = `${results.risks.length} flagged`;

        // Update complexity and risk styling
        const complexityElement = document.getElementById('complexity');
        complexityElement.className = `value complexity-${results.complexity.toLowerCase()}`;

        const riskElement = document.getElementById('risk-factors');
        riskElement.className = `value risk-${results.riskLevel.toLowerCase()}`;

        // Update simplified summary
        document.getElementById('simplified-summary').innerHTML = `<p>${results.summary}</p>`;

        // Update clauses
        const clausesList = document.getElementById('clauses-list');
        clausesList.innerHTML = results.clauses.map(clause => `
            <div class="clause-item">
                <div class="clause-header">
                    <h4>${clause.title}</h4>
                    <span class="clause-type ${clause.type}">${clause.type.charAt(0).toUpperCase() + clause.type.slice(1)}</span>
                </div>
                <p class="clause-explanation">${clause.explanation}</p>
            </div>
        `).join('');

        // Update risk assessment
        const riskItems = document.getElementById('risk-items');
        riskItems.innerHTML = results.risks.map(risk => `
            <div class="risk-item ${risk.level}-risk">
                <div class="risk-icon">
                    <i class="fas fa-${risk.level === 'high' ? 'exclamation-circle' : 'info-circle'}"></i>
                </div>
                <div class="risk-content">
                    <h4>${risk.title}</h4>
                    <p>${risk.description}</p>
                </div>
            </div>
        `).join('');

        // Show analysis section
        analysisSection.style.display = 'block';
        analysisSection.scrollIntoView({ behavior: 'smooth' });

        // Initialize chat with document context
        this.initializeChatWithContext(results);
    }

    // Chat Interface
    setupChatInterface() {
        const questionInput = document.getElementById('question-input');
        
        questionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendQuestion();
            }
        });
    }

    initializeChatWithContext(results) {
        const chatMessages = document.getElementById('chat-messages');
        const contextMessage = document.createElement('div');
        contextMessage.className = 'message bot-message';
        contextMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>I've analyzed your ${results.documentType}. I can help explain any clauses, answer questions about your rights and obligations, or clarify any confusing terms. What would you like to know?</p>
            </div>
        `;
        chatMessages.appendChild(contextMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async sendQuestion() {
        const questionInput = document.getElementById('question-input');
        const question = questionInput.value.trim();
        
        if (!question) return;

        // Add user message
        this.addMessage(question, 'user');
        questionInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateAIResponse(question);
            this.addMessage(response, 'bot');
        }, 1500);
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarIcon = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        this.chatHistory.push({ content, sender, timestamp: new Date() });
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateAIResponse(question) {
        const responses = {
            'obligations': 'Based on your document, your main obligations include paying rent on time, maintaining the property in good condition, and following the terms outlined in the agreement. You should also notify the landlord of any issues promptly.',
            'termination': 'You can terminate the lease by providing 30 days written notice. However, early termination may require paying the remaining rent or finding a replacement tenant. Check your specific agreement for exact terms.',
            'rights': 'As a tenant, you have the right to quiet enjoyment of the property, timely repairs from the landlord, and proper notice before entry. You also have the right to dispute unfair charges.',
            'breach': 'If you break the contract, consequences may include late fees, eviction proceedings, damage to your credit, and potential legal action. The specific consequences depend on the type of breach.',
            'default': 'Default typically occurs after missing payments or violating terms. Consequences may include late fees, credit reporting, acceleration of debt, and potential legal action.',
            'payment': 'Payment terms vary by document type. Generally, payments are due monthly with specific due dates and late fees for missed payments. Check your document for exact amounts and dates.',
            'security': 'Security deposits are typically refundable and held for damages or unpaid rent. They must be returned within a specified time after lease termination, minus any legitimate deductions.',
            'maintenance': 'Maintenance responsibilities are usually split between tenant and landlord. Tenants typically handle minor repairs and cleaning, while landlords handle major structural issues and appliances.'
        };

        const lowerQuestion = question.toLowerCase();
        
        // Find the best matching response
        for (const [key, response] of Object.entries(responses)) {
            if (lowerQuestion.includes(key)) {
                return response;
            }
        }

        // Default responses based on common question patterns
        if (lowerQuestion.includes('what') && lowerQuestion.includes('mean')) {
            return 'I\'d be happy to explain that term or clause. Could you provide more specific details about what you\'d like me to clarify?';
        }
        
        if (lowerQuestion.includes('can i') || lowerQuestion.includes('am i allowed')) {
            return 'Your rights and permissions depend on the specific terms in your document. I can help clarify what you\'re allowed to do based on the agreement.';
        }
        
        if (lowerQuestion.includes('risk') || lowerQuestion.includes('dangerous')) {
            return 'I\'ve identified several potential risks in your document. The main concerns are highlighted in the risk assessment section. Would you like me to explain any specific risks in more detail?';
        }

        return 'That\'s a great question! I can help explain that based on your document. Could you provide more specific details so I can give you the most accurate answer?';
    }

    askQuickQuestion(question) {
        const questionInput = document.getElementById('question-input');
        questionInput.value = question;
        this.sendQuestion();
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(e);
        });
    }

    // Language Selector
    setupLanguageSelector() {
        // Wait for DOM elements to be available
        setTimeout(() => {
            const languageToggle = document.getElementById('language-toggle');
            const languageDropdown = document.getElementById('language-dropdown');
            const langOptions = document.querySelectorAll('.lang-option');
            
            if (!languageToggle || !languageDropdown) {
                console.error('Language selector elements not found');
                return;
            }
            
            // Load saved language or default to English
            const savedLanguage = localStorage.getItem('language') || 'en';
            this.setLanguage(savedLanguage);
            
            // Toggle dropdown
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('active');
            });
            
            // Handle language selection
            langOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const selectedLang = option.getAttribute('data-lang');
                    this.setLanguage(selectedLang);
                    languageDropdown.classList.remove('active');
                });
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageDropdown.classList.remove('active');
                }
            });
            
            console.log('Language selector initialized successfully');
        }, 100);
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setLanguage(lang) {
        document.documentElement.setAttribute('data-lang', lang);
        localStorage.setItem('language', lang);
        
        // Update current language display
        const currentLangElement = document.getElementById('current-lang');
        const langOptions = document.querySelectorAll('.lang-option');
        
        if (currentLangElement) {
            const selectedOption = Array.from(langOptions).find(option => 
                option.getAttribute('data-lang') === lang
            );
            const langCode = selectedOption?.getAttribute('data-code') || 'EN';
            currentLangElement.textContent = langCode;
        }
        
        // Update active language option
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });
        
        // Translate all text content
        this.translateContent(lang);
        
        console.log(`Language switched to: ${lang}`);
    }

    getTranslations() {
        return {
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-features': 'Features',
                'nav-how-it-works': 'How It Works',
                'nav-contact': 'Contact',
                
                // Hero Section
                'hero-title': 'Demystify Legal Documents with AI',
                'hero-subtitle': 'Transform complex legal jargon into clear, accessible guidance. Make informed decisions with confidence.',
                'hero-analyze-btn': 'Analyze Document',
                'hero-learn-btn': 'Learn More',
                
                // Upload Section
                'upload-title': 'Upload Your Legal Document',
                'upload-subtitle': 'Get instant analysis and simplified explanations',
                'upload-drag-text': 'Drag & Drop Your Document',
                'upload-browse-text': 'or browse files',
                'upload-formats': 'Supported: PDF, DOC, DOCX, TXT',
                
                // Analysis Section
                'analysis-title': 'Document Analysis Results',
                'analysis-download': 'Download Report',
                'analysis-share': 'Share Results',
                'analysis-summary': 'Document Summary',
                'analysis-simplified': 'Simplified Summary',
                'analysis-clauses': 'Key Clauses Explained',
                'analysis-risks': 'Risk Assessment',
                
                // Q&A Section
                'qa-title': 'Ask Questions About Your Document',
                'qa-subtitle': 'Get instant answers to your legal questions',
                'qa-placeholder': 'Ask a question about your document...',
                'qa-obligations': 'Main Obligations',
                'qa-breach': 'Breach Consequences',
                'qa-termination': 'Early Termination',
                
                // Features Section
                'features-title': 'Powerful Features',
                'features-subtitle': 'Everything you need to understand legal documents',
                'feature-simplification': 'Document Simplification',
                'feature-simplification-desc': 'AI-powered translation of complex legal jargon into plain, understandable language.',
                'feature-qa': 'Interactive Q&A',
                'feature-qa-desc': 'Ask specific questions about your document and get instant, relevant answers.',
                'feature-risks': 'Risk Identification',
                'feature-risks-desc': 'Automatically flags potentially unfavorable clauses and hidden risks.',
                'feature-keypoints': 'Key Point Extraction',
                'feature-keypoints-desc': 'Highlights essential information like obligations, termination conditions, and liability clauses.',
                'feature-security': 'Private & Secure',
                'feature-security-desc': 'Your documents are processed securely with end-to-end encryption protection.',
                'feature-mobile': 'Mobile Optimized',
                'feature-mobile-desc': 'Access your document analysis anywhere with our responsive mobile interface.',
                
                // How It Works Section
                'how-title': 'How It Works',
                'how-subtitle': 'Simple steps to understand your legal documents',
                'step-upload': 'Upload Document',
                'step-upload-desc': 'Upload your legal document in PDF, DOC, or text format',
                'step-analysis': 'AI Analysis',
                'step-analysis-desc': 'Our AI analyzes the document structure and identifies key elements',
                'step-results': 'Get Results',
                'step-results-desc': 'Receive simplified summaries, risk assessments, and explanations',
                'step-questions': 'Ask Questions',
                'step-questions-desc': 'Interact with our AI to get answers to specific questions',
                
                // Contact Section
                'contact-title': 'Get In Touch',
                'contact-subtitle': 'Have questions? We\'re here to help',
                'contact-email': 'Email',
                'contact-name-placeholder': 'Your Name',
                'contact-email-placeholder': 'Your Email',
                'contact-message-placeholder': 'Your Message',
                'contact-send': 'Send Message',
                
                // Footer
                'footer-description': 'Empowering individuals to understand legal documents through AI-powered simplification.',
                'footer-quick-links': 'Quick Links',
                'footer-legal': 'Legal',
                'footer-privacy': 'Privacy Policy',
                'footer-terms': 'Terms of Service',
                'footer-cookies': 'Cookie Policy',
                'footer-copyright': 'All rights reserved.',
                'footer-designed': 'Designed by Alpha Coderss',
                
                // Chatbot
                'chatbot-title': 'AI Legal Assistant',
                'chatbot-welcome': 'Hello! I\'m your AI legal assistant powered by Gemini 2.0 Flash. I can help you understand legal documents, answer questions, and provide guidance. How can I assist you today?',
                'chatbot-placeholder': 'Ask me anything about legal documents...',
                'chatbot-key-terms': 'Key Terms',
                'chatbot-risk-analysis': 'Risk Analysis',
                'chatbot-obligations': 'My Obligations'
            },
            
            hi: {
                // Navigation
                'nav-home': 'होम',
                'nav-features': 'विशेषताएं',
                'nav-how-it-works': 'यह कैसे काम करता है',
                'nav-contact': 'संपर्क',
                
                // Hero Section
                'hero-title': 'AI के साथ कानूनी दस्तावेजों को समझें',
                'hero-subtitle': 'जटिल कानूनी शब्दजाल को स्पष्ट, सुलभ मार्गदर्शन में बदलें। आत्मविश्वास के साथ सूचित निर्णय लें।',
                'hero-analyze-btn': 'दस्तावेज का विश्लेषण करें',
                'hero-learn-btn': 'और जानें',
                
                // Upload Section
                'upload-title': 'अपना कानूनी दस्तावेज अपलोड करें',
                'upload-subtitle': 'तुरंत विश्लेषण और सरलीकृत स्पष्टीकरण प्राप्त करें',
                'upload-drag-text': 'अपना दस्तावेज खींचें और छोड़ें',
                'upload-browse-text': 'या फाइलें ब्राउज़ करें',
                'upload-formats': 'समर्थित: PDF, DOC, DOCX, TXT',
                
                // Analysis Section
                'analysis-title': 'दस्तावेज विश्लेषण परिणाम',
                'analysis-download': 'रिपोर्ट डाउनलोड करें',
                'analysis-share': 'परिणाम साझा करें',
                'analysis-summary': 'दस्तावेज सारांश',
                'analysis-simplified': 'सरलीकृत सारांश',
                'analysis-clauses': 'मुख्य खंडों की व्याख्या',
                'analysis-risks': 'जोखिम मूल्यांकन',
                
                // Q&A Section
                'qa-title': 'अपने दस्तावेज के बारे में प्रश्न पूछें',
                'qa-subtitle': 'अपने कानूनी प्रश्नों के तुरंत उत्तर प्राप्त करें',
                'qa-placeholder': 'अपने दस्तावेज के बारे में कोई प्रश्न पूछें...',
                'qa-obligations': 'मुख्य दायित्व',
                'qa-breach': 'उल्लंघन के परिणाम',
                'qa-termination': 'समय से पहले समाप्ति',
                
                // Features Section
                'features-title': 'शक्तिशाली विशेषताएं',
                'features-subtitle': 'कानूनी दस्तावेजों को समझने के लिए आपको जो कुछ चाहिए',
                'feature-simplification': 'दस्तावेज सरलीकरण',
                'feature-simplification-desc': 'जटिल कानूनी शब्दजाल का AI-संचालित अनुवाद स्पष्ट, समझने योग्य भाषा में।',
                'feature-qa': 'इंटरैक्टिव प्रश्नोत्तर',
                'feature-qa-desc': 'अपने दस्तावेज के बारे में विशिष्ट प्रश्न पूछें और तुरंत, प्रासंगिक उत्तर प्राप्त करें।',
                'feature-risks': 'जोखिम पहचान',
                'feature-risks-desc': 'संभावित प्रतिकूल खंडों और छुपे जोखिमों को स्वचालित रूप से चिह्नित करता है।',
                'feature-keypoints': 'मुख्य बिंदु निष्कर्षण',
                'feature-keypoints-desc': 'दायित्वों, समाप्ति की शर्तों और दायित्व खंडों जैसी आवश्यक जानकारी को उजागर करता है।',
                'feature-security': 'निजी और सुरक्षित',
                'feature-security-desc': 'आपके दस्तावेजों को एंड-टू-एंड एन्क्रिप्शन सुरक्षा के साथ सुरक्षित रूप से संसाधित किया जाता है।',
                'feature-mobile': 'मोबाइल अनुकूलित',
                'feature-mobile-desc': 'हमारे उत्तरदायी मोबाइल इंटरफेस के साथ कहीं भी अपने दस्तावेज विश्लेषण तक पहुंचें।',
                
                // How It Works Section
                'how-title': 'यह कैसे काम करता है',
                'how-subtitle': 'अपने कानूनी दस्तावेजों को समझने के लिए सरल चरण',
                'step-upload': 'दस्तावेज अपलोड करें',
                'step-upload-desc': 'PDF, DOC, या टेक्स्ट प्रारूप में अपना कानूनी दस्तावेज अपलोड करें',
                'step-analysis': 'AI विश्लेषण',
                'step-analysis-desc': 'हमारा AI दस्तावेज संरचना का विश्लेषण करता है और मुख्य तत्वों की पहचान करता है',
                'step-results': 'परिणाम प्राप्त करें',
                'step-results-desc': 'सरलीकृत सारांश, जोखिम मूल्यांकन और स्पष्टीकरण प्राप्त करें',
                'step-questions': 'प्रश्न पूछें',
                'step-questions-desc': 'विशिष्ट प्रश्नों के उत्तर प्राप्त करने के लिए हमारे AI के साथ बातचीत करें',
                
                // Contact Section
                'contact-title': 'संपर्क में रहें',
                'contact-subtitle': 'कोई प्रश्न हैं? हम यहाँ मदद के लिए हैं',
                'contact-email': 'ईमेल',
                'contact-name-placeholder': 'आपका नाम',
                'contact-email-placeholder': 'आपका ईमेल',
                'contact-message-placeholder': 'आपका संदेश',
                'contact-send': 'संदेश भेजें',
                
                // Footer
                'footer-description': 'AI-संचालित सरलीकरण के माध्यम से कानूनी दस्तावेजों को समझने के लिए व्यक्तियों को सशक्त बनाना।',
                'footer-quick-links': 'त्वरित लिंक',
                'footer-legal': 'कानूनी',
                'footer-privacy': 'गोपनीयता नीति',
                'footer-terms': 'सेवा की शर्तें',
                'footer-cookies': 'कुकी नीति',
                'footer-copyright': 'सभी अधिकार सुरक्षित।',
                'footer-designed': 'अल्फा कोडर्स द्वारा डिज़ाइन किया गया',
                
                // Chatbot
                'chatbot-title': 'AI कानूनी सहायक',
                'chatbot-welcome': 'नमस्ते! मैं आपका AI कानूनी सहायक हूं जो Gemini 2.0 Flash द्वारा संचालित है। मैं आपको कानूनी दस्तावेजों को समझने, प्रश्नों के उत्तर देने और मार्गदर्शन प्रदान करने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?',
                'chatbot-placeholder': 'कानूनी दस्तावेजों के बारे में मुझसे कुछ भी पूछें...',
                'chatbot-key-terms': 'मुख्य शर्तें',
                'chatbot-risk-analysis': 'जोखिम विश्लेषण',
                'chatbot-obligations': 'मेरे दायित्व'
            },
            
            zh: {
                // Navigation
                'nav-home': '首页',
                'nav-features': '功能',
                'nav-how-it-works': '工作原理',
                'nav-contact': '联系我们',
                
                // Hero Section
                'hero-title': '用AI解密法律文件',
                'hero-subtitle': '将复杂的法律术语转化为清晰易懂的指导。自信地做出明智决定。',
                'hero-analyze-btn': '分析文件',
                'hero-learn-btn': '了解更多',
                
                // Upload Section
                'upload-title': '上传您的法律文件',
                'upload-subtitle': '获得即时分析和简化解释',
                'upload-drag-text': '拖拽您的文件',
                'upload-browse-text': '或浏览文件',
                'upload-formats': '支持格式：PDF, DOC, DOCX, TXT',
                
                // Analysis Section
                'analysis-title': '文件分析结果',
                'analysis-download': '下载报告',
                'analysis-share': '分享结果',
                'analysis-summary': '文件摘要',
                'analysis-simplified': '简化摘要',
                'analysis-clauses': '关键条款解释',
                'analysis-risks': '风险评估',
                
                // Q&A Section
                'qa-title': '询问关于您文件的问题',
                'qa-subtitle': '获得法律问题的即时答案',
                'qa-placeholder': '询问关于您文件的问题...',
                'qa-obligations': '主要义务',
                'qa-breach': '违约后果',
                'qa-termination': '提前终止',
                
                // Features Section
                'features-title': '强大功能',
                'features-subtitle': '理解法律文件所需的一切',
                'feature-simplification': '文件简化',
                'feature-simplification-desc': 'AI驱动的复杂法律术语翻译为清晰易懂的语言。',
                'feature-qa': '互动问答',
                'feature-qa-desc': '询问关于您文件的具体问题并获得即时相关答案。',
                'feature-risks': '风险识别',
                'feature-risks-desc': '自动标记潜在不利条款和隐藏风险。',
                'feature-keypoints': '关键点提取',
                'feature-keypoints-desc': '突出显示义务、终止条件和责任条款等基本信息。',
                'feature-security': '私密安全',
                'feature-security-desc': '您的文件通过端到端加密保护安全处理。',
                'feature-mobile': '移动优化',
                'feature-mobile-desc': '通过我们的响应式移动界面随时随地访问文件分析。',
                
                // How It Works Section
                'how-title': '工作原理',
                'how-subtitle': '理解法律文件的简单步骤',
                'step-upload': '上传文件',
                'step-upload-desc': '以PDF、DOC或文本格式上传您的法律文件',
                'step-analysis': 'AI分析',
                'step-analysis-desc': '我们的AI分析文件结构并识别关键元素',
                'step-results': '获得结果',
                'step-results-desc': '接收简化摘要、风险评估和解释',
                'step-questions': '提问',
                'step-questions-desc': '与我们的AI互动以获得具体问题的答案',
                
                // Contact Section
                'contact-title': '联系我们',
                'contact-subtitle': '有问题吗？我们随时为您提供帮助',
                'contact-email': '邮箱',
                'contact-name-placeholder': '您的姓名',
                'contact-email-placeholder': '您的邮箱',
                'contact-message-placeholder': '您的消息',
                'contact-send': '发送消息',
                
                // Footer
                'footer-description': '通过AI驱动的简化，赋能个人理解法律文件。',
                'footer-quick-links': '快速链接',
                'footer-legal': '法律',
                'footer-privacy': '隐私政策',
                'footer-terms': '服务条款',
                'footer-cookies': 'Cookie政策',
                'footer-copyright': '版权所有。',
                'footer-designed': '由Alpha Coderss设计',
                
                // Chatbot
                'chatbot-title': 'AI法律助手',
                'chatbot-welcome': '您好！我是您的AI法律助手，由Gemini 2.0 Flash驱动。我可以帮助您理解法律文件、回答问题并提供指导。今天我能为您做些什么？',
                'chatbot-placeholder': '询问我任何关于法律文件的问题...',
                'chatbot-key-terms': '关键术语',
                'chatbot-risk-analysis': '风险分析',
                'chatbot-obligations': '我的义务'
            }
        };
    }

    translateContent(lang) {
        const translations = this.translations[lang] || this.translations.en;
        
        // Translate elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
        
        // Update chatbot welcome message if chatbot is open
        if (window.chatbot && window.chatbot.isOpen) {
            const chatbotWelcome = document.querySelector('#chatbot-messages .message-content p');
            if (chatbotWelcome && chatbotWelcome.getAttribute('data-translate') === 'chatbot-welcome') {
                chatbotWelcome.textContent = translations['chatbot-welcome'];
            }
        }
        
        // Update chatbot input placeholder
        const chatbotInput = document.getElementById('chatbot-input-field');
        if (chatbotInput) {
            chatbotInput.placeholder = translations['chatbot-placeholder'];
        }
        
        // Update chatbot title
        const chatbotTitle = document.querySelector('.chatbot-title span');
        if (chatbotTitle) {
            chatbotTitle.textContent = translations['chatbot-title'];
        }
        
        // Update chatbot suggestion buttons
        const suggestionButtons = document.querySelectorAll('.suggestion-btn');
        suggestionButtons.forEach((btn, index) => {
            const keys = ['chatbot-key-terms', 'chatbot-risk-analysis', 'chatbot-obligations'];
            if (keys[index] && translations[keys[index]]) {
                btn.textContent = translations[keys[index]];
            }
        });
        
        // Refresh chatbot welcome message if chatbot is open
        if (window.chatbot && window.chatbot.isOpen) {
            setTimeout(() => {
                window.chatbot.showWelcomeMessage();
            }, 100);
        }
        
        console.log(`Website translated to: ${lang}`);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Update navbar background for scroll effect
        this.updateNavbarBackground();
    }

    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 100) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(24, 24, 24, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(24, 24, 24, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }

    async handleContactForm(e) {
        const form = e.target;
        const actionUrl = form.getAttribute('action');
        const formData = new FormData(form);

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                const data = await response.json().catch(() => null);
                const errorMsg = data && data.errors && data.errors.length
                    ? data.errors.map(err => err.message).join(', ')
                    : 'Failed to send message. Please try again.';
                this.showNotification(errorMsg, 'error');
            }
        } catch (error) {
            this.showNotification('Network error. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .step, .analysis-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Utility Functions
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Global Functions for HTML onclick handlers
function scrollToUpload() {
    document.getElementById('upload').scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function sendQuestion() {
    if (window.legalAI) {
        window.legalAI.sendQuestion();
    }
}

function askQuickQuestion(question) {
    if (window.legalAI) {
        window.legalAI.askQuickQuestion(question);
    }
}

function downloadReport() {
    if (!window.legalAI || !window.legalAI.analysisResults) {
        alert('Please upload and analyze a document first.');
        return;
    }
    
    const results = window.legalAI.analysisResults;
    const reportContent = `
LEGAL DOCUMENT ANALYSIS REPORT
Generated by LegalAI
Date: ${new Date().toLocaleDateString()}

DOCUMENT SUMMARY
Document Type: ${results.documentType}
Complexity Level: ${results.complexity}
Risk Level: ${results.riskLevel}

SIMPLIFIED SUMMARY
${results.summary}

KEY CLAUSES EXPLAINED
${results.clauses.map(clause => `
${clause.title} (${clause.type.toUpperCase()})
${clause.explanation}
`).join('\n')}

RISK ASSESSMENT
${results.risks.map(risk => `
${risk.title} (${risk.level.toUpperCase()})
${risk.description}
`).join('\n')}

KEY POINTS
${results.keyPoints.map(point => `• ${point}`).join('\n')}

CHAT HISTORY
${window.legalAI.chatHistory.map(msg => `
${msg.sender.toUpperCase()}: ${msg.content}
`).join('\n')}

---
This report is for informational purposes only and does not constitute legal advice.
Please consult with a qualified attorney for legal matters.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-analysis-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function shareResults() {
    if (!window.legalAI || !window.legalAI.analysisResults) {
        alert('Please upload and analyze a document first.');
        return;
    }
    
    if (navigator.share) {
        navigator.share({
            title: 'Legal Document Analysis',
            text: 'Check out my legal document analysis results!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const shareText = `Check out my legal document analysis results: ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Chatbot Class
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.chatHistory = [];
        this.geminiApiKey = 'AIzaSyBSzctnv051RTB-q1LW9JCKVDtakcW70ag'; // Pre-configured API key
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadApiKey();
    }

    setupEventListeners() {
        // Wait for DOM elements to be available
        setTimeout(() => {
            const toggle = document.getElementById('chatbot-toggle');
            const close = document.getElementById('chatbot-close');
            const sendBtn = document.getElementById('chatbot-send');
            const inputField = document.getElementById('chatbot-input-field');

            if (toggle) {
                toggle.addEventListener('click', () => this.toggleChat());
                console.log('Chatbot toggle event listener added');
            } else {
                console.error('Chatbot toggle element not found');
            }
            
            if (close) {
                close.addEventListener('click', () => this.closeChat());
            }
            
            if (sendBtn) {
                sendBtn.addEventListener('click', () => this.sendMessage());
            }
            
            if (inputField) {
                inputField.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendMessage();
                    }
                });
            }

            // Close chat when clicking outside
            document.addEventListener('click', (e) => {
                const chatbotWidget = document.getElementById('chatbot-widget');
                
                if (this.isOpen && chatbotWidget && !chatbotWidget.contains(e.target)) {
                    this.closeChat();
                }
            });
        }, 200);
    }

    loadApiKey() {
        // API key is pre-configured, show welcome message
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const messagesContainer = document.getElementById('chatbot-messages');
            if (!messagesContainer) return;
            
            // Clear any existing messages
            messagesContainer.innerHTML = '';
            
            // Get current language
            const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
            const translations = window.legalAI?.translations?.[currentLang] || window.legalAI?.translations?.en;
            const welcomeText = translations?.['chatbot-welcome'] || 'Hello! I\'m your AI legal assistant powered by Gemini 2.0 Flash. I can help you understand legal documents, answer questions, and provide guidance. How can I assist you today?';
            
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message bot-message';
            welcomeMessage.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar-robot">
                        <div class="avatar-eyes">
                            <div class="avatar-eye"></div>
                            <div class="avatar-eye"></div>
                        </div>
                    </div>
                </div>
                <div class="message-content">
                    <p data-translate="chatbot-welcome">${welcomeText}</p>
                </div>
            `;
            messagesContainer.appendChild(welcomeMessage);
            this.scrollToBottom();
        }, 200);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const window = document.getElementById('chatbot-window');
        if (!window) return;
        
        window.classList.add('active');
        this.isOpen = true;
        
        // Focus on input field
        setTimeout(() => {
            const inputField = document.getElementById('chatbot-input-field');
            if (inputField) {
                inputField.focus();
            }
        }, 300);
    }

    closeChat() {
        const window = document.getElementById('chatbot-window');
        if (!window) return;
        
        window.classList.remove('active');
        this.isOpen = false;
    }

    async sendMessage() {
        const inputField = document.getElementById('chatbot-input-field');
        if (!inputField) return;
        
        const message = inputField.value.trim();
        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        inputField.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get response from Gemini 2.0 Flash
            const response = await this.getGeminiResponse(message);
            this.hideTypingIndicator();
            this.addBotMessage(response);
        } catch (error) {
            this.hideTypingIndicator();
            console.error('Chatbot error:', error);
            this.addBotMessage('Sorry, I encountered an error. Please try again.');
        }
    }

    async getGeminiResponse(message) {
        const context = this.buildContext();
        const prompt = `${context}\n\nUser: ${message}\n\nAssistant:`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format');
        }
    }

    buildContext() {
        // Get current language
        const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
        
        let context = `You are an AI legal assistant powered by Gemini 2.0 Flash. You help users understand legal documents, answer legal questions, and provide guidance on legal matters. 

Key capabilities:
- Analyze and explain legal documents
- Identify key terms, obligations, and risks
- Provide simplified explanations of complex legal language
- Answer questions about contracts, agreements, and legal processes
- Offer general legal guidance (but always recommend consulting a qualified attorney for specific legal advice)

Important guidelines:
- Always be helpful, accurate, and professional
- Simplify complex legal concepts into plain language
- Highlight potential risks or important clauses
- Recommend consulting a qualified attorney for serious legal matters
- Be concise but thorough in your responses
- Use examples when helpful for understanding`;

        // Add language instruction
        if (currentLang === 'hi') {
            context += '\n\nIMPORTANT: Respond in Hindi (हिन्दी). Use Devanagari script for Hindi text.';
        } else if (currentLang === 'zh') {
            context += '\n\nIMPORTANT: Respond in Chinese (中文). Use Simplified Chinese characters.';
        } else {
            context += '\n\nIMPORTANT: Respond in English.';
        }

        context += '\n\nCurrent session context:';

        // Add document analysis context if available
        if (window.legalAI && window.legalAI.analysisResults) {
            const results = window.legalAI.analysisResults;
            context += `\n\nUser has uploaded a ${results.documentType} with ${results.complexity} complexity level. Key points include: ${results.keyPoints.join(', ')}.`;
        }

        // Add recent chat history for context
        if (this.chatHistory.length > 0) {
            context += '\n\nRecent conversation:';
            this.chatHistory.slice(-5).forEach(msg => {
                context += `\n${msg.sender}: ${msg.content}`;
            });
        }

        return context;
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.chatHistory.push({ content: message, sender: 'User', timestamp: new Date() });
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-robot">
                    <div class="avatar-eyes">
                        <div class="avatar-eye"></div>
                        <div class="avatar-eye"></div>
                    </div>
                </div>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.chatHistory.push({ content: message, sender: 'Assistant', timestamp: new Date() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message chatbot-typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-robot">
                    <div class="avatar-eyes">
                        <div class="avatar-eye"></div>
                        <div class="avatar-eye"></div>
                    </div>
                </div>
            </div>
            <div class="chatbot-typing">
                <div class="chatbot-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.chatbot-typing');
        if (typingIndicator) {
            const messageElement = typingIndicator.closest('.message');
            if (messageElement) {
                messageElement.remove();
            }
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global function for suggestion buttons
function askChatbot(question) {
    if (window.chatbot) {
        const inputField = document.getElementById('chatbot-input-field');
        if (inputField) {
            inputField.value = question;
            window.chatbot.sendMessage();
        }
    }
}

// Test functions for debugging
function testChatbot() {
    console.log('Testing chatbot...');
    if (window.chatbot) {
        window.chatbot.openChat();
        console.log('Chatbot opened');
    } else {
        console.error('Chatbot not initialized');
    }
}

function testLanguageSelector() {
    console.log('Testing language selector...');
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        console.log('Language dropdown toggled');
    } else {
        console.error('Language dropdown not found');
    }
}

// Make test functions available globally
window.testChatbot = testChatbot;
window.testLanguageSelector = testLanguageSelector;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing LegalAI application...');
    
    try {
        window.legalAI = new LegalAI();
        console.log('✅ LegalAI initialized');
    } catch (error) {
        console.error('❌ LegalAI initialization failed:', error);
    }
    
    try {
        window.chatbot = new Chatbot();
        console.log('✅ Chatbot initialized');
    } catch (error) {
        console.error('❌ Chatbot initialization failed:', error);
    }
    
    // Debug: Check if elements exist
    setTimeout(() => {
        const chatbotWidget = document.getElementById('chatbot-widget');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWindow = document.getElementById('chatbot-window');
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        
        console.log('Element check:');
        console.log('- Chatbot Widget:', !!chatbotWidget);
        console.log('- Chatbot Toggle:', !!chatbotToggle);
        console.log('- Chatbot Window:', !!chatbotWindow);
        console.log('- Language Toggle:', !!languageToggle);
        console.log('- Language Dropdown:', !!languageDropdown);
        
        if (chatbotWidget && chatbotToggle && chatbotWindow) {
            console.log('✅ Chatbot elements found - should be working!');
        } else {
            console.log('❌ Some chatbot elements missing');
        }
        
        if (languageToggle && languageDropdown) {
            console.log('✅ Language selector elements found - should be working!');
        } else {
            console.log('❌ Some language selector elements missing');
        }
    }, 500);
});

// Add CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #64748b;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) {
        animation-delay: -0.32s;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: -0.16s;
    }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);
