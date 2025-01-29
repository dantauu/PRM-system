import styles from './choose-contact.module.scss'
import { MemoButton, PageLayout } from '@/shared/components';
import BlobImage from '@/assets/landing/images/bl2.gif'
import ContactsIconLignt from "@/assets/account/images/contacts-icon-light.png"
import ContactsIconDark from "@/assets/account/images/contacts-icon-dark.png"
import { useTheme } from '@/shared/theme';

export const ChooseContact = () => {
    const { theme } = useTheme()
    const src = theme === 'light' ? ContactsIconLignt : ContactsIconDark

    return (
        <div className={styles.mainContainer}>
            <PageLayout.Cloud
                contentClassName="contacts-stats"
                header={{
                    title: 'Последний контакт',
                    subtitle: 'С этим человеком вы недавно общались',
                    right: (
                        <div className={styles.contactsButtonContainer}>
                            <button className={styles.contactsButton}>
                                <div className={styles.contactsButtonDiv}>
                                    <img
                                        src={src}
                                        alt="contacts-icon"
                                    />
                                </div>
                            </button>
                        </div>
                    )
                }}
            >
                <div className={styles.content}>
                    <div className={styles.blobConstrainer}>
                        <img
                            className={styles.chooseContactBlob}
                            src={BlobImage}
                            alt="blob"
                        />
                    </div>
                    <div className={styles.right}>
                        <div>Для начала работы выберите контакт</div>
                        <div className={styles.chooseContactButton}>
                            <MemoButton>Выбрать контакт</MemoButton>
                        </div>
                    </div>
                </div>
            </PageLayout.Cloud>
        </div>
    );
};
