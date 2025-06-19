export type Agent = {
    id: string
    name: string
    email: string
    created_at: string
  }
  
  export type Client = {
    id: string
    agent_id: string
    rag_soc: string
    insegna?: string
    cap?: string
    citta?: string
    via?: string
    telefono?: string
    email?: string
    pec?: string
    cfe?: string
    p_iva?: string
    cod_fiscale?: string
    tip_cliente?: string
    num_pv?: number
    dest_m?: boolean
    sconto_in_fattura?: number
    contratto?: string
    iban?: string
    df_data?: string | null
    df_datafm?: string
    mail_amm?: string
    mail_mag?: string
    mail_tit?: string
    desc_dest?: string
    citta_dest?: string
    ind_dest?: string
    prov_dest?: string
    cap_dest?: string
    created_at: string
  }