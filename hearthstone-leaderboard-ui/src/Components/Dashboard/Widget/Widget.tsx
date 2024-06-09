import { Card, Text } from "dracula-ui"


interface Props {
    Title: string,
    Content: string
}

export function Widget({ Title, Content }: Props) {
    return (
        <Card 
            display="inline-grid"
            style={{boxShadow: "none", backgroundColor: "#1e212a", padding: "1.5em"}}>
                <Text color="pink" weight="bold" size="md">{Title}</Text>
                {Content}
        </Card>
    )
}