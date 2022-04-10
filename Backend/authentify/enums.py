from django.db.models import TextChoices


class Gender(TextChoices):
    MALE = "male"
    FEMALE = "female"


class Status(TextChoices):
    PAID = "paid"
    UNPAID = "unpaid"


class TransactionType(TextChoices):
    DEPOSIT = "deposit"
    CREDIT = "credit"


class TransactionStatus(TextChoices):
    INITIATED = "INITIATED"
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    REVERSED = "REVERSED"
    FAILED = "FAILED"


class Banks(TextChoices):
    Access_Bank = "044"
    Access_Bank_Diamond = "063"
    ALAT_by_WEMA = "035A"
    Carbon = "565"
    Citibank_Nigeria = "023"
    Ecobank_Nigeria = "050"
    Eyowo = "50126"
    Fidelity_Bank = "070"
    First_Bank_of_Nigeria = "011"
    First_City_Monument_Bank = "214"
    Globus_Bank = "00103"
    GoMoney = "100022"
    Guaranty_Trust_Bank = "058"
    Heritage_Bank = "030"
    Jaiz_Bank = "301"
    Keystone_Bank = "082"
    Kuda_Bank = "50211"
    Paga = "100002"
    PalmPay = "999991"
    Parallex_Bank = "526"
    Paycom = "999992"
    Polaris_Bank = "076"
    Providus_Bank = "101"
    Rand_Merchant_Bank = "502"
    Rubies_MFB = "125"
    Stanbic_IBTC_Bank = "221"
    Standard_Chartered_Bank = "068"
    Sterling_Bank = "232"
    Suntrust_Bank = "100"
    Titan_Bank = "102"
    Union_Bank_of_Nigeria = "032"
    United_Bank_For_Africa = "033"
    Unity_Bank = "215"
    VFD_Microfinance_Bank_Limited = "566"
    Wema_Bank = "035"
    Zenith_Bank = "057"
