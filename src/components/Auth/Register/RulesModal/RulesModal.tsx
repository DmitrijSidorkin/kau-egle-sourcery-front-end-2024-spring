import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/button/Button';
import IconButton from '@/components/IconButton/IconButton';
import { ButtonSizes } from '@/components/button/Enum';
import styles from './RulesModal.module.scss';

interface RulesModalProps {
  handleRulesModalState: Dispatch<SetStateAction<boolean>>;
}

function RulesModal({ handleRulesModalState }: RulesModalProps) {
  return (
    <div className={styles['window-container']}>
      <div className={styles['rules-card']}>
        <div className={styles['rules-card__content']}>
          <div className={styles['rules-card__header']}>
            <h3 className={styles['rules-card__header-text']}>Community Rules</h3>
            <IconButton onClick={() => handleRulesModalState(false)} />
          </div>
          <p className={styles['rules-card__rules-text']}>
            Cognizant Technology Solutions Corporation and its affiliated companies (“Cognizant”
            “we” or “us”) are firmly committed to protecting your privacy. You should understand
            what we do with data relating to you (“personal information”) which we collect when you
            visit this website (cognizant.com), our country-specific sites or any other websites to
            which this Cognizant Website Privacy Notice (“Privacy Notice”) applies (collectively,
            the “Sites”). As a global company, Cognizant has a number of legal entities in different
            jurisdictions which are responsible for the personal information which they collect
            independently and which may be processed on their behalf by Cognizant Technology
            Solutions U.S. Corporation and its affiliates. The data controller for personal
            information collected from a visitor to the Sites is Cognizant Technology Solutions U.S.
            Corporation, 211 Quality Circle, College Station, Texas, United States of America or the
            affiliate specified on the Site that references this Privacy Notice.
            <br />
            <br /> We may supplement this Privacy Notice to address specific situations. All
            supplemental notices should be read together with this Privacy Notice.
          </p>
        </div>
        <div className={styles['rules-card__button-container']}>
          <Button size={ButtonSizes.Medium} onClick={() => handleRulesModalState(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
export default RulesModal;
