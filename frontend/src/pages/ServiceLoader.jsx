import React, { Suspense, lazy, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import NAV from '@/data/navigation'

const importMap = {
  '/ConsultanExpert/talkToLawyer': () => import('./ConsultanExpert/talkToLawyer.jsx'),
  '/ConsultanExpert/talkToCA': () => import('./ConsultanExpert/talkToCA.jsx'),
  '/ConsultanExpert/talkToCS': () => import('./ConsultanExpert/talkToCS.jsx'),
  '/ConsultanExpert/talkToIP': () => import('./ConsultanExpert/talkToIP.jsx'),

  '/BusinessSetup/plc': () => import('./BusinessSetup/plc.jsx'),
  '/BusinessSetup/llp': () => import('./BusinessSetup/llp.jsx'),
  '/BusinessSetup/opc': () => import('./BusinessSetup/opc.jsx'),
  '/BusinessSetup/sp': () => import('./BusinessSetup/sp.jsx'),
  '/BusinessSetup/nidhi': () => import('./BusinessSetup/nidhi.jsx'),
  '/BusinessSetup/producer': () => import('./BusinessSetup/producer.jsx'),
  '/BusinessSetup/partnership': () => import('./BusinessSetup/partnership.jsx'),
  '/BusinessSetup/startup': () => import('./BusinessSetup/startup.jsx'),

  '/International/us': () => import('./International/us.jsx'),
  '/International/singapore': () => import('./International/singapore.jsx'),
  '/International/uk': () => import('./International/uk.jsx'),
  '/International/netherlands': () => import('./International/netherlands.jsx'),
  '/International/hong-kong': () => import('./International/hong-kong.jsx'),
  '/International/dubai': () => import('./International/dubai.jsx'),
  '/International/international-trademark': () => import('./International/international-trademark.jsx'),

  '/Licenses/dsc': () => import('./Licenses/dsc.jsx'),
  '/Licenses/udyam': () => import('./Licenses/udyam.jsx'),
  '/Licenses/msme': () => import('./Licenses/msme.jsx'),
  '/Licenses/iso': () => import('./Licenses/iso.jsx'),
  '/Licenses/fssai': () => import('./Licenses/fssai.jsx'),
  '/Licenses/iec': () => import('./Licenses/iec.jsx'),
  '/Licenses/spice-board': () => import('./Licenses/spice-board.jsx'),
  '/Licenses/fieo': () => import('./Licenses/fieo.jsx'),
  '/Licenses/legal-metrology': () => import('./Licenses/legal-metrology.jsx'),
  '/Licenses/hallmark': () => import('./Licenses/hallmark.jsx'),
  '/Licenses/bis': () => import('./Licenses/bis.jsx'),
  '/Licenses/liquor': () => import('./Licenses/liquor-license.jsx'),
  '/Licenses/clra': () => import('./Licenses/clra.jsx'),
  '/Licenses/adcode': () => import('./Licenses/ad-code.jsx'),
  '/Licenses/irdai': () => import('./Licenses/irdai.jsx'),
  '/Licenses/drug-cosmetic': () => import('./Licenses/drug-cosmetic.jsx'),
  '/Licenses/apeda-rcmc': () => import('./Licenses/APEDARegistrationPage.jsx'),
  '/Licenses/customs-clearance': () => import('./Licenses/CustomsClearancePage.jsx'),

  '/Fundraising': () => import('./Fundraising/index.jsx'),
  '/Fundraising/pitch-deck': () => import('./Fundraising/pitch-deck.jsx'),
  '/Fundraising/business-loan': () => import('./Fundraising/business-loan.jsx'),
  '/Fundraising/dpr': () => import('./Fundraising/dpr.jsx'),

  '/NGO': () => import('./NGO/index.jsx'),
  '/NGO/section-8': () => import('./NGO/section-8.jsx'),
  '/NGO/trust': () => import('./NGO/trust.jsx'),
  '/NGO/society': () => import('./NGO/society.jsx'),
  '/NGO/compliance': () => import('./NGO/compliance.jsx'),
  '/NGO/section8': () => import('./NGO/compliance-section-8.jsx'),
  '/NGO/csr1': () => import('./NGO/csr1.jsx'),
  '/NGO/80g-12a': () => import('./NGO/80g-12a.jsx'),
  '/NGO/darpan': () => import('./NGO/darpan.jsx'),
  '/NGO/fcra': () => import('./NGO/fcra.jsx'),
}

export default function ServiceLoader(){
  const loc = useLocation()
  const path = loc.pathname
  const entry = importMap[path]
  const info = NAV[path]

  const LazyComp = useMemo(()=>{
    if(!entry) return null
    return lazy(entry)
  },[path])

  if(!entry){
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold">{info?info.title:'Page not found'}</h1>
        <p className="text-sm text-slate-600 mt-2">This page is not available as a dedicated module yet. Use the navigation to select a service.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <LazyComp />
    </Suspense>
  )
}
