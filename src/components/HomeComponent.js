import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import logo from '../imagens/192.png'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    botao: {
        flexGrow: 1,
        itemAlign: 'center',
     
    },
    textField: {
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    titulo: {
        flexGrow: 1,
        marginTop: 10,
        textAlign: 'center',
        color:'black'
    },
    subtitulo: {
        flexGrow: 1,
        marginTop: 30,
        textAlign: 'center',
        color:'black'
    },
    subtitulo1: {
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        color:'black'
    },
    banner: {
        flexGrow: 1,
        marginLeft: 10,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    slide: {
        flexGrow: 1,
        backgroundColor: "#26388Fab", 
        textAlign: "center", 
        fontSize: 15, 
        color: "#FFFFFF",
        marginLeft: 10,
        marginRight: 10,
    }
}));


export default function SpacingGrid() {
    const classes = useStyles();
    const [dadosVagas, setVagas] = useState([]);
    const [dadosVagas1, setVagas1] = useState([]);
    const [nome, setNome] = useState([]);

    async function buscaVagas() {
        try {
            axios.get('/Vagas').then(response => {
                setVagas(response.data)
            }).catch(function (error) {
                console.log(error.config);
            });

        } catch (error) {
            console.log(error)
        }
    }

    async function buscaVagas1() {
        try {
            axios.get('/Vagas/filtro').then(response => {
                setVagas1(response.data)
            }).catch(function (error) {
                console.log(error.config);
            });
        } catch (error) {
            console.log(error)
        }
    }

    function vagaDetalhe(id, local, nome, salario) {
        localStorage.setItem('ID', id);
        localStorage.setItem('VAGA', nome);
        localStorage.setItem('LOCAL', local);
        localStorage.setItem('SALARIO', salario);
        window.location.href = `/portal/cargos`;
    }

    useEffect(() => {
        buscaVagas()
        buscaVagas1()
    }, [])

    function vagaEscolhida(vaga) {
        console.log(vaga)
        localStorage.setItem('VAGAE', vaga);
        window.location.href = "/portal/vagas";
    }

    return (
        <form
            id="form"
            name="form"
            className={classes.root}
            noValidate
            autoComplete="off">
            <Paper className={classes.paper}>
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={12} imagem className={classes.imagem}>
                        <img class="displayed" src={logo} alt={"logo"} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h4" className={classes.titulo}>
                            Seja bem-vindo(a) ao JobsNet
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6" className={classes.subtitulo}>
                            Pequise uma vaga de emprego que mais combina com você
                        </Typography>
                    </Grid>
                </Grid>


                <Grid item xs={12}>
                    <Autocomplete
                        id="free-solo-demo"
                        onChange={(event, value) => vagaEscolhida(value)}
                        freeSolo
                        options={dadosVagas.map((option) => option.nome)}
                        renderInput={(params) => (
                            <TextField {...params} label="Pesquise uma vaga..." margin="normal" variant="outlined" />
                        )}
                    />
                </Grid>
            </Paper>
            <Grid item xs={12} className={classes.paper} >
                <Button
                    variant="contained"
                    color="Primary"
                    href="/portal/cargos"
                    fullWidth={true}
                >
                    VER TODAS AS VAGAS
                </Button>
            </Grid>
            <Divider />
            <Paper>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6" className={classes.subtitulo1}>
                            VAGAS EM DESTAQUE
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {dadosVagas1.map((option1) => (
                        <Grid item xs={12} sm={6} md={4} >
                            <Paper 
                            className={classes.slide}
                            onClick={() => vagaDetalhe(option1.id, option1.local, option1.nome, option1.salario)}
                            >
                                <Typography variant="h5">
                                    {option1.nome}
                                </Typography>
                                <Typography>
                                    Localidade
                                </Typography>
                                <Typography>
                                    {option1.local}
                                </Typography>
                                <Typography>
                                    Salário
                                </Typography>
                                <Typography>
                                    R$ {option1.salario},00
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </form>
    );
}