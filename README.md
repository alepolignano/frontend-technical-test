# Frontend Technical Test

InterPro entries represent curated information about protein families, domains, repeats, and important sites. To classify protein sequences, InterPro entries use predictive models, known as signatures, provided by multiple biological member databases.

This test is focused on InterPro entries of the type _repeat_.

You should use the following API endpoints to complete the test:

* InterPro entries of the type _repeat_: https://www.ebi.ac.uk/interpro/api/entry/InterPro/?type=repeat
* Detailed information about an Interpro entry: `https://www.ebi.ac.uk/interpro/api/entry/InterPro/[accession]`. Examples:
  * `IPR000033`: https://www.ebi.ac.uk/interpro/api/entry/InterPro/IPR000033
  * `IPR000102`: https://www.ebi.ac.uk/interpro/api/entry/InterPro/IPR000102

We would like you to create a React application that dynamically displays the information for the tasks below.

You can bootstrap your application using any library and bundler of your choice, but please provide scripts to install, build, and start a development environment. (e.g. `npm install`, `npm run build`, `npm run start`).

---

## Tasks

### Chart aggregation - Solution: [Component](https://github.com/alepolignano/frontend-technical-test/blob/main/src/components/ChartAggregator/ChartAggregator.js)

Aggregate the information of the InterPro repeat entries into a chart that shows how many signatures each member database contributes to repeat entries.
For example, `IPR000003` has 1 Pfam, 1 Profile, and 1 SMART signatures; `IPR000102` has 1 PFAM and 1 Prosite signatures. Therefore, a chart for these two entries might look like this:
  
<p align="center">
    <img width="651" alt="Screenshot 2024-05-15 at 12 15 01" title="Chart aggregation" src="https://github.com/ProteinsWebTeam/frontend-technical-test/assets/46671268/9e3d750e-5cd8-4f1e-a800-ba0eea43855c">
</p>

Your task is to generate a similar chart (it doesn't need to be a bar chart), using any library or style of your preference that aggregates all 374 InterPro repeat entries.

### Data Table - Solution: [Component](https://github.com/alepolignano/frontend-technical-test/blob/main/src/components/DataTable/DataTable.js)

Create a data table that displays information for all the repeat entries. Follow this example:

<p align="center">
  <img width="651" alt="Screenshot 2024-05-15 at 13 54 20" title="Data table" src="https://github.com/ProteinsWebTeam/frontend-technical-test/assets/46671268/2c13b6d3-2233-4cda-995d-2b9e92dad744">
</p>

### Row expansion - Solution [Code #1](https://github.com/alepolignano/frontend-technical-test/blob/main/src/components/DataTable/DataTable.js#L44), [Code #2](https://github.com/alepolignano/frontend-technical-test/blob/main/src/components/DataTable/DataTable.js#L97)

Based on the table built in the previous task, when the user clicks the `+`, expand the row and display the integrated signatures and the most recent literature reference associated with the entry. For example:

<p align="center">
  <img width="651" alt="Screenshot 2024-05-15 at 13 47 10" title="Row expansion" src="https://github.com/ProteinsWebTeam/frontend-technical-test/assets/46671268/85710b65-5497-4282-9ba9-85531b9f7c4d">
</p>

### Continuous Deployment - Solution: [GitHub page](https://alepolignano.github.io/frontend-technical-test/), [Branch](https://github.com/alepolignano/frontend-technical-test/tree/gh-pages)

Using GitHub Actions, create a Continuous Deployment (CD) script that publishes your app to GitHub Pages.
