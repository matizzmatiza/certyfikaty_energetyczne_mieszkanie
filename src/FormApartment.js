import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Container, Paper, Typography, Alert, AlertTitle } from '@mui/material';
import FormikTextField from './components/FormikTextField';
import FormikNumberField from './components/FormikNumberField';
import FormikSelectField from './components/FormikSelectField';
import FormikCheckbox from './components/FormikCheckbox';
import Table from './components/Table';

// Schemat walidacji Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Pole wymagane'),
    surname: Yup.string().required('Pole wymagane'),
    email: Yup.string().email('Nieprawidłowy adres e-mail').required('Pole wymagane'),
    tel: Yup.string().matches(/^[0-9]{9}$/, 'Nieprawidłowy numer telefonu').required('Pole wymagane'),
    street: Yup.string().required('Pole wymagane'),
    nrBudynku: Yup.string().required('Pole wymagane'),
    nrMieszkania: Yup.string(),
    miejscowosc: Yup.string().required('Pole wymagane'),
    kodPocztowy: Yup.string().matches(/^[0-9]{2}-[0-9]{3}$/, 'Nieprawidłowy kod pocztowy (00-000)').required('Pole wymagane'),
    powierzchniaUzytkowaMieszkania: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    liczbaKondygnacjiMieszkania: Yup.number().required('Pole wymagane').min(1, 'Wartość za niska').max(2, 'Wartość za wysoka'),
    wysokoscPomieszczenCm: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    rokOddaniaDoUzytkowania: Yup.number().min(1800, 'Wartość za niska').max(new Date().getFullYear() - 1, 'Wartość za wysoka'),
    ekspozycjaMieszkania: Yup.string().required('Pole wymagane'),
    mieszkanieZnajdujeSieNaPart: Yup.boolean(),
    rodzajStropuPodParterem: Yup.string().required('Pole wymagane'),
    tenSamRodzajStropuPodCalaPowMiesz: Yup.boolean(),
    mieszkanieZnajdujeSieNaOstatnimPiet: Yup.boolean(),
    rodzajStropuNadOstatnimPetr: Yup.string().required('Pole wymagane'),
    tenSamRodzajStropuNadCalaPowMiesz: Yup.boolean(),
    dachZnajdujeSieBezposredNadMieszk: Yup.boolean(),
    materialDach: Yup.string().required('Pole wymagane'),
    dachJestOcieplony: Yup.boolean(),
    dachPosiadaOknoPolaciowe: Yup.boolean(),
    materialZKtoregoZbudJestScZewn: Yup.string().required('Pole wymagane'),
    gruboscScianyZewnCm: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    materialIzolacjiScianyZewn: Yup.string().required('Pole wymagane'),
    gruboscIzolacjiScianyZewnCm: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    materialRamyOkien: Yup.string().required('Pole wymagane'),
    liczbaSzybWOknach: Yup.string().required('Pole wymagane'),
    rokProdukcjiOkienLubU: Yup.string(),
    wymiaryDrzwiZewnCm: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    wymiaryOkienCm: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    wymiaryDrzwiBalkCm: Yup.number().positive('Wartość musi być dodatnia'),
    materialZKtoregoZbudJestScKlatkaSch: Yup.string().required('Pole wymagane'),
    grubscScianyCmKlatSch: Yup.number().required('Pole wymagane').positive('Wartość musi być dodatnia'),
    klatkaSchodowaJestOgrzewana: Yup.boolean(),
    budWKtZnajdSieMieszkPrzecTerm: Yup.boolean(),
    orientacyjnyRokOstatniejTermomodernizacji: Yup.number().min(1900, 'Wartość za niska').max(new Date().getFullYear() - 1, 'Wartość za wysoka'),
    wymianaOkien: Yup.boolean(),
    wymianaDachu: Yup.boolean(),
    ocieplenieScian: Yup.boolean(),
});

let initialRows = [
    { service: 'Świadectwo charakterystyki energetycznej mieszkania', amount: 289.00 },
];

const MyForm = () => {
    const [rows, setRows] = useState(initialRows);

return (
  <Formik
    initialValues={{
        name: '',
        surname: '',
        email: '',
        tel: '',
        street: '',
        nrBudynku: '',
        nrMieszkania: '',
        miejscowosc: '',
        kodPocztowy: '',
        powierzchniaUzytkowaMieszkania: '',
        liczbaKondygnacjiMieszkania: '',
        wysokoscPomieszczenCm: '',  
        rokOddaniaDoUzytkowania: '',
        ekspozycjaMieszkania: '',
        mieszkanieZnajdujeSieNaPart: false,
        rodzajStropuPodParterem: '',
        tenSamRodzajStropuPodCalaPowMiesz: true,
        mieszkanieZnajdujeSieNaOstatnimPiet: false,
        rodzajStropuNadOstatnimPetr: '',
        tenSamRodzajStropuNadCalaPowMiesz: true,
        dachZnajdujeSieBezposredNadMieszk: false,
        materialDach: '',
        dachJestOcieplony: false,
        dachPosiadaOknoPolaciowe: false,
        materialZKtoregoZbudJestScZewn: '',
        gruboscScianyZewnCm: '',
        materialIzolacjiScianyZewn: '',
        gruboscIzolacjiScianyZewnCm: '',
        materialRamyOkien: '',
        liczbaSzybWOknach: '',
        rokProdukcjiOkienLubU: '',
        wymiaryDrzwiZewnCm: '',
        wymiaryOkienCm: '',
        wymiaryDrzwiBalkCm: '',
        materialZKtoregoZbudJestScKlatkaSch: '',
        grubscScianyCmKlatSch: '',
        klatkaSchodowaJestOgrzewana: false,
        budWKtZnajdSieMieszkPrzecTerm: false,
        orientacyjnyRokOstatniejTermomodernizacji: '',
        wymianaOkien: false,
        wymianaDachu: false,
        ocieplenieScian: false,
    }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting, values  }) => (
        <Container maxWidth="lg">
            <Form>

                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6" gutterBottom style={{fontSize: '14px', fontWeight: 'bold'}}>Dane kontaktowe</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <FormikTextField name="name" label="Imię*" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikTextField name="surname" label="Nazwisko*" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikTextField name="email" label="Adres e-mail*" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikTextField name="tel" label="Numer telefonu (9 cyfr)*" />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6" gutterBottom style={{fontSize: '14px', fontWeight: 'bold'}}>Dane podstawowe nieruchomości</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormikTextField name="street" label="Ulica*" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormikTextField name="nrBudynku" label="Nr budynku*" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormikTextField name="nrMieszkania" label="Nr mieszkania" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <FormikTextField name="miejscowosc" label="Miejscowość*" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormikTextField name="kodPocztowy" label="Kod pocztowy*" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <FormikNumberField name="powierzchniaUzytkowaMieszkania" label="Powierzchnia użytkowa mieszkania (m2)*" 
                            infoText="Powierzchnia z aktu notarialnego"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormikNumberField name="liczbaKondygnacjiMieszkania" label="Liczba kondygnacji mieszkania (1-2)*" />
                        </Grid>
                    </Grid>
                    {/* {values.liczbaKondygnacjiMieszkania === '2' && (
                        <>
                            <Alert severity='warning' style={{marginTop: '20px'}}>
                            <AlertTitle>Mieszkanie dwupoziomowe</AlertTitle>
                            Dla mieszkań dwupoziomowych obowiązuje dopłata 100 zł
                            </Alert>
                            {setRows([...initialRows, { service: 'Dodatkowa opłata za mieszkanie dwupoziomowe', amount: 100 }])}
                        </>
                    )}                  */}
                </Paper>

                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6" gutterBottom style={{fontSize: '14px', fontWeight: 'bold'}}>Dane szczegółowe nieruchomości</Typography>
                    <Typography variant="h6" gutterBottom style={{fontSize: '18px', fontWeight: 'bold', margin: '20px 0'}}>Dane podstawowe nieruchomości</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormikNumberField name="wysokoscPomieszczenCm" label="Wysokość pomieszczeń (cm)*" 
                            infoText="Jeśli występują skosy, podaj średnią wysokość pomieszczeń"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormikNumberField name="rokOddaniaDoUzytkowania" label="Rok oddania do użytkowania" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormikSelectField name="ekspozycjaMieszkania" label="Ekspozycja mieszkania*" 
                            options={[
                                { value: 'mieszkanieJednostronne', label: 'Mieszkanie jednostronne' },
                                { value: 'mieszkanieDwustronne', label: 'Mieszkanie dwustronne'},
                                { value: 'mieszkanieTrzystronne', label: 'Mieszkanie trzystronne'},
                                { value: 'mieszkanieCzterostronne', label: 'Mieszkanie czterostronne'}
                            ]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormikCheckbox name="mieszkanieZnajdujeSieNaPart" label="Mieszkanie znajduje się na parterze" />
                        </Grid>
                        {values.mieszkanieZnajdujeSieNaPart &&
                            <>
                                <Grid item xs={12} sm={12}>
                                    <FormikSelectField name="rodzajStropuPodParterem" label="Rodzaj stropu pod parterem*" 
                                    options={[
                                        { value: 'podlogaNaGruncie', label: 'Podłoga na gruncie' },
                                        { value: 'mieszkanieDwustronne', label: 'Strop nad pomieszczeniami nieogrzewanymi'},
                                        { value: 'mieszkanieTrzystronne', label: 'Strop nad podziemnymi pomeiszczeniami ogrzewanymi'},
                                    ]} 
                                    />
                                </Grid>
                                {values.rodzajStropuPodParterem === 'podlogaNaGruncie' &&
                                    <>
                                    <Grid item xs={12} sm={12}>
                                        <FormikCheckbox name="tenSamRodzajStropuPodCalaPowMiesz" label="Ten sam rodzaj stropu pod całą powierzchnią mieszkania" />
                                    </Grid>
                                    </>
                                }
                            </>
                        }
                        <Grid item xs={12} sm={12}>
                            <FormikCheckbox name="mieszkanieZnajdujeSieNaOstatnimPiet" label="Mieszkanie znajduje się na ostatnim piętrze" />
                        </Grid>
                        {values.mieszkanieZnajdujeSieNaOstatnimPiet &&
                            <>
                                <Grid item xs={12} sm={12}>
                                    <FormikSelectField name="rodzajStropuNadOstatnimPetr" label="Rodzaj stropu nad ostatnim piętrem*" 
                                    options={[
                                        { value: 'dachSpadzisty', label: 'Dach spadzisty' },
                                        { value: 'dachPlaski', label: 'Dach płaski (stropodach)'},
                                        { value: 'stropPodNieogrzewanymPoddaszem', label: 'Strop pod nieogrzewanym poddaszem'},
                                        { value: 'nieWiem', label: 'Nie wiem'}
                                    ]} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormikCheckbox name="tenSamRodzajStropuNadCalaPowMiesz" label="Ten sam rodzaj stropu nad całą powierzchnią mieszkania" />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormikCheckbox name="dachZnajdujeSieBezposredNadMieszk" label="Dach znajduje się bezpośrednio nad mieszkaniem" />
                                </Grid>
                                {values.dachZnajdujeSieBezposredNadMieszk &&
                                    <>
                                        <Grid item xs={12} sm={12}>
                                            <FormikSelectField name="materialDach" label="Materiał (dach)*" 
                                            options={[
                                                { value: 'drewno', label: 'Drewno' },
                                                { value: 'cegla', label: 'Cegła'},
                                                { value: 'inne', label: 'Inne'},
                                                { value: 'nieWiem', label: 'Nie wiem'}
                                            ]} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormikCheckbox name="dachJestOcieplony" label="Dach jest ocieplony" />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormikCheckbox name="dachPosiadaOknoPolaciowe" label="Dach posiada okno połaciowe" />
                                        </Grid>
                                    </>
                                }
                            </>
                        }
                    </Grid>
                    <Typography variant="h6" gutterBottom style={{fontSize: '18px', fontWeight: 'bold', margin: '20px 0'}}>Ściany zewnętrzne, okna</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormikSelectField name="materialZKtoregoZbudJestScZewn" label="Materiał, z którego zbudowana jest ściana zewnętrzna*" 
                            options={[
                                { value: 'betonKomorkowy', label: 'Beton komórkowy' },
                                { value: 'ytongForte', label: 'Ytong Forte'},
                                { value: 'cegla', label: 'Cegła'},
                                { value: 'silka', label: 'Silka'},
                                { value: 'porotherm', label: 'Porotherm'},
                                { value: 'zelbet', label: 'Żelbet'},
                                { value: 'pustak', label: 'Pustak'},
                                { value: 'nieWiem', label: 'Nie wiem'}
                            ]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikNumberField name="gruboscScianyZewnCm" label="Grubość ściany zewnętrznej (cm)*" 
                            infoText="Całkowita grubość - razem z ociepleniem"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikSelectField name="materialIzolacjiScianyZewn" label="Materiał izolacji ściany zewnętrznej*" 
                            options={[
                                { value: 'styropianBialy', label: 'Styropian biały' },
                                { value: 'styropianGrafitowy', label: 'Styropian grafitowy'},
                                { value: 'welnaMieszana', label: 'Wełna mieszana'},
                                { value: 'brak', label: 'Brak'},
                                { value: 'nieWiem', label: 'Nie wiem'}
                            ]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikNumberField name="gruboscIzolacjiScianyZewnCm" label="Grubość izolacji ściany zewnętrznej (cm)*" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormikSelectField name="materialRamyOkien" label="Materiał ramy okien*" 
                            options={[
                                { value: 'plastikowaPVC', label: 'Plastikowa (PVC)' },
                                { value: 'drewniana', label: 'Drewniana'},
                                { value: 'aluminiowa', label: 'Aluminiowa'},
                                { value: 'nieWiem', label: 'Nie wiem'}
                            ]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormikSelectField name="liczbaSzybWOknach" label="Liczba szyb w oknach*" 
                            options={[
                                { value: 'oknaJednoszybowe', label: 'Okna jednoszybowe' },
                                { value: 'oknaDwuszybowe', label: 'Okna dwuszybowe'},
                                { value: 'oknaTrzyszybowe', label: 'Okna trzyszybowe'},
                                { value: 'nieWiem', label: 'Nie wiem'}
                            ]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikTextField name="rokProdukcjiOkienLubU" label="Rok produkcji okien lub współczynnik U" 
                            infoText="Rok produkcji i współczynnik U są wytłoczone w środku ramy okiennej"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormikNumberField name="wymiaryDrzwiZewnCm" label="Wymiary drzwi zewnętrznych (cm)*" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormikNumberField name="wymiaryOkienCm" label="Wymiary okien (cm)*" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormikNumberField name="wymiaryDrzwiBalkCm" label="Wymiary drzwi balkonowych (cm)" />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom style={{fontSize: '18px', fontWeight: 'bold', margin: '20px 0'}}>Ściana granicząca z klatką schodową</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormikSelectField name="materialZKtoregoZbudJestScKlatkaSch" label="Materiał, z którego zbudowana jest ściana*" 
                            options={[
                                { value: 'betonKomorkowy', label: 'Beton komórkowy' },
                                { value: 'ytongForte', label: 'Ytong Forte'},
                                { value: 'cegla', label: 'Cegła'},
                                { value: 'silka', label: 'Silka'},
                                { value: 'porotherm', label: 'Porotherm'},
                                { value: 'zelbet', label: 'Żelbet'},
                                { value: 'pustak', label: 'Pustak'},
                                { value: 'nieWiem', label: 'Nie wiem'}
                            ]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormikNumberField name="grubscScianyCmKlatSch" label="Grubość ściany (cm)*" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormikCheckbox name="klatkaSchodowaJestOgrzewana" label="Klatka schodowa jest ogrzewana" />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom style={{fontSize: '18px', fontWeight: 'bold', margin: '20px 0'}}>Ogrzewanie, wentylacja, ciepła woda użytkowa</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <FormikCheckbox name="budWKtZnajdSieMieszkPrzecTerm" label="Budynek, w którym znajduje się mieszkanie, przechodził termomodernizację" />
                        </Grid>
                        {values.budWKtZnajdSieMieszkPrzecTerm &&
                            <>
                                <Grid item xs={12} sm={12}>
                                    <FormikNumberField name="orientacyjnyRokOstatniejTermomodernizacji" label="Orientacyjny rok ostatniej termomodernizacji" />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormikCheckbox name="wymianaOkien" label="Wymiana okien" />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormikCheckbox name="wymianaDachu" label="Wymiana dachu" />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormikCheckbox name="ocieplenieScian" label="Ocieplenie ścian" />
                                </Grid>
                            </>
                        }
                    </Grid>
                </Paper>

                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6" gutterBottom style={{fontSize: '14px', fontWeight: 'bold'}}>Dane do płatności</Typography>
                    <Typography variant="h6" gutterBottom style={{fontSize: '18px', fontWeight: 'bold', margin: '20px 0'}}>Podsumowanie płatności</Typography>

                    <Table rows={rows}/>

                    {values.liczbaKondygnacjiMieszkania === 2 &&
                        <>
                           {/* dodaj 100 zł za mieszkanie dwupoziomowe */}
                        </>
                    }  
                </Paper>

                <Button variant="contained" type="submit" disabled={isSubmitting} style={{ marginTop: 16 }}>Zapłać</Button>
            </Form>
        </Container>
    )}
  </Formik>
);

}

export default MyForm;