import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import CreateIcon from "@mui/icons-material/Create";
import NotesIcon from "@mui/icons-material/Notes";
import InsightsIcon from "@mui/icons-material/Insights";

export default function Home() {
  return (
    <Stack direction={"column"} alignItems="center" justifyContent="center">
      <Box
        display={"flex"}
        minWidth={"max-content"}
        textAlign={"center"}
        sx={{ p: 1 }}
      >
        <Typography variant="h4">TransMark Dashboard</Typography>
      </Box>
      <Box width={"80vw"}>
        <Grid container display={"flex"} direction={"row"} spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  width={"100%"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  gap={2}
                  justifyContent={"center"}
                >
                  <CreateIcon />
                  <Typography>Create a Transcript</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  width={"100%"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  gap={2}
                  justifyContent={"center"}
                >
                  <NotesIcon />
                  <Typography>Your Transcripts</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  width={"100%"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  gap={2}
                  justifyContent={"center"}
                >
                  <InsightsIcon />
                  <Typography>Analyze Your Transcript</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
    </Stack>
  );
}
