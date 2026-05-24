/**
 * MobileTabs – two-tab switcher (Corners / Review) shown only on the mobile
 * layout, where the dialog body collapses to one panel at a time.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';

export type MobileTab = 'photo' | 'preview';

interface Props {
  mobileTab: MobileTab;
  setMobileTab: React.Dispatch<React.SetStateAction<MobileTab>>;
}

export const MobileTabs: React.FC<Props> = ({ mobileTab, setMobileTab }) => {
  const { t } = useTranslation();

  return (
    <div className="brd-mobile-tabs">
      <button
        className={`brd-mobile-tab${mobileTab === 'photo' ? ' active' : ''}`}
        onClick={() => setMobileTab('photo')}
      >
        <span className="brd-mobile-tab-badge">1</span>
        {t('boardRecognition.stepCorners')}
      </button>
      <button
        className={`brd-mobile-tab${mobileTab === 'preview' ? ' active' : ''}`}
        onClick={() => setMobileTab('preview')}
      >
        <span className="brd-mobile-tab-badge">2</span>
        {t('boardRecognition.stepReview')}
      </button>
    </div>
  );
};
