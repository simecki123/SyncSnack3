"use client"
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'

export default function Counter() {

    const t = useTranslations('HomePage');
    const [number, setNumber ] = useState(0);

    function handleClick() {
        
        setNumber(prew => prew+1);
    }

  return (
    <div>

        <h1>{t('number')} {number}</h1>
        <button onClick={handleClick}>Click</button>
    </div>
  )
}
