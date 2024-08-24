"use client";
import React, { useState } from "react";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { GifBox } from "@mui/icons-material";

function Summary() {
  const [summary, setSummary] = useState(
    `The meeting transcript highlighted several key action items, including the need to streamline communication channels and improve project timelines. 
    Comments emphasized the importance of collaboration across departments, and several files were attached to provide additional context on proposed strategies. 
    The discussion also touched on potential risks and mitigation plans, with suggestions for further research and follow-up meetings.`
  );

  return (
    <Box
      sx={{
        backgroundColor: "rgba(3,5,12,255)",
        color: "white",
      }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      minHeight={"100vh"}
    >
      <Navbar />
      <Box display={"flex"} justifyContent={"center"} p={2} marginTop={4}>
        <Typography variant="h4">Summary</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          p={2}
          spacing={1}
          width={"70vw"}
        >
          <Grid item xs={12} md={10}>
            <Box
              sx={{
                backgroundColor: "rgba(36,36,29,255)",
                p: 2,
                borderRadius: "10px",
                border: "1px solid white",
              }}
            >
              <Typography>{summary}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display={"flex"} flexDirection={"column"} p={2} gap={1} width={"50%"}>
              <Button
                sx={{
                  backgroundColor: "rgba(255,245,0,255)",
                  color: "rgba(0,0,0,255)",
                }}
              >
                <Typography>Save</Typography>
              </Button>
              <Button
                sx={{
                  backgroundColor: "rgba(255,245,0,255)",
                  color: "rgba(0,0,0,255)",
                }}
              >
                <Typography>Save</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default Summary;
