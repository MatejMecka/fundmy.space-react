import Typography from '@material-ui/core/Typography';

export default function Page404 ({ location }){
    return (
        <div>
        <Typography variant="h6" gutterBottom>
            Error 404
        </Typography>
        <Typography variant="h2">No match found for <code>{location.pathname}</code></Typography>
        </div>
    ); 
}