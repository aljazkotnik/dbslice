This is a branch of the original dbslice project (https://github.com/grahampullan/dbslice).

It reduces the plotting functionality to three basic plot types: bar, histogram, and scatter plots. 

It adds the functionality that allows the user to dynamically add or remove plots from the view.


Known bugs and missing desired behaviour:
- Minimal example cannot be initialised as blank page
- Plot 'svg' elements do not resize on window resize
- Histograms have their y-axis labels hidden
- On passing a filtered subset to neighbouring plot on delete actions the brush graphics do not automatically update
- Histograms have their bars move on first user itneraction
- Adding the scatter plots dos not allowed a color coding property to be selected
- Scatter plots do not have points remain selected when clicked
