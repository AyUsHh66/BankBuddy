# Virtual Bank Manager - Conversation Flow

└── Loan_type
    ├── Personal_loan

    ├── Home_loan
    
    └── Auto_loan
    
        └── Eligibility_check
    
            ├── Rejected
    
            │   └── Alternatives
    
            │       └── Acceptance_nxt (if accepted)
    
            └── Identity_verification
    
                └── Income_verification
    
                    └── Document_collection
    
                        ├── Property_doc (if Home_loan)
    
                        ├── Auto_doc (if Auto_loan)
    
                        └── Application_complete
    
                            └── Approved
    
                                └── Acceptance_nxt
