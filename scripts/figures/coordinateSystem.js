const segmentsArray = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];
let scaleIndex = 4;
let gridSizeArray = [90, 80, 70, 65, 50, 40, 35, 30, 25, 20, 15, 10];
let AxisDistanceGridLinesArray = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let startSegment = segmentsArray[scaleIndex];

let canvas = document.getElementById("figures-canvas");

document.addEventListener("DOMContentLoaded", () => {
    // drawCoordinateSystem(canvas,
    //     gridSizeArray[scaleIndex],
    //     AxisDistanceGridLinesArray[scaleIndex],
    //     AxisDistanceGridLinesArray[scaleIndex],
    //     startSegment,
    //     startSegment);

    drawGrid(canvas.getContext("2d"), canvas.width, canvas.height, 0, {value: 30});
});

function drawGrid(ctx, width, height, margin, gridSize) {
    const effectiveWidth = width - 2 * margin
    const effectiveHeight = height - 2 * margin
    const step = effectiveWidth / (gridSize.value * 2)

    // Draw the grid lines
    ctx.beginPath()
    for (let x = margin; x <= effectiveWidth + margin; x += step) {
        ctx.moveTo(x, margin);
        ctx.lineTo(x, effectiveHeight + margin);
    }
    for (let y = margin; y <= effectiveHeight + margin; y += step) {
        ctx.moveTo(margin, y);
        ctx.lineTo(effectiveWidth + margin, y);
    }
    ctx.strokeStyle = '#b0e0e6' // Light blue color
    ctx.stroke();

    // Draw the axes
    ctx.beginPath();
    ctx.strokeStyle = 'black' // Black color for axes
    ctx.moveTo(width / 2, margin);
    ctx.lineTo(width / 2, effectiveHeight + margin)
    ctx.moveTo(margin, height / 2);
    ctx.lineTo(effectiveWidth + margin, height / 2)
    ctx.stroke();

    // Label the axes
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = -gridSize.value; i <= gridSize.value; i++) {
        if (i !== 0) {
            if(gridSize.value > 10 && i % 2 !== 0) {
                continue;
            }
            if(gridSize.value > 20 && i % 5 !== 0) {
                continue;
            }
            ctx.fillText(i.toString(), width / 2 + i * step, height / 2 + step)
            ctx.fillText(i.toString(), width / 2 - step , height / 2 - i * step)
        }
    }
}


function updateParameters(newScale) {
    if(newScale >= 0 && newScale < segmentsArray.length) {
        scaleIndex = newScale;
    }

    startSegment = segmentsArray[scaleIndex];

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    drawCoordinateSystem(canvas,
        gridSizeArray[scaleIndex],
        AxisDistanceGridLinesArray[scaleIndex],
        AxisDistanceGridLinesArray[scaleIndex],
        startSegment,
        startSegment);
}

function drawCoordinateSystem(canvas,
                              grid_size,
                              x_axis_distance_grid_lines,
                              y_axis_distance_grid_lines,
                              x_axis_starting_point,
                              y_axis_starting_point) {
    const canvas_width = canvas.width;
    const canvas_height = canvas.height;
    const ctx = canvas.getContext("2d");

    ctx.save();

    //no of vertical grid lines
    const num_lines_x = Math.floor(canvas_height/grid_size);
    //no of horizontal grid lines
    const num_lines_y = Math.floor(canvas_width/grid_size);


    // Draw grid lines along X-axis
    for(let i= 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
        if(i == x_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if(i == num_lines_x) {
            ctx.moveTo(0, grid_size*i);
            ctx.lineTo(canvas_width, grid_size*i);
        }
        else {
            ctx.moveTo(0, grid_size*i+0.5);
            ctx.lineTo(canvas_width, grid_size*i+0.5);
        }
        ctx.stroke();
    }

// Draw grid lines along Y-axis
    for(i=0; i<=num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents Y-axis draw in different color
        if(i == y_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if(i == num_lines_y) {
            ctx.moveTo(grid_size*i, 0);
            ctx.lineTo(grid_size*i, canvas_height);
        }
        else {
            ctx.moveTo(grid_size*i+0.5, 0);
            ctx.lineTo(grid_size*i+0.5, canvas_height);
        }
        ctx.stroke();
    }

    ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

// Ticks marks along the positive X-axis
    for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(grid_size*i+0.5, -3);
        ctx.lineTo(grid_size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText((x_axis_starting_point*i).toFixed(1), grid_size*i-2, 15);
    }

// Ticks marks along the negative X-axis
    for(i=1; i<y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid_size*i+0.5, -3);
        ctx.lineTo(-grid_size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText((-x_axis_starting_point*i).toFixed(1), -grid_size*i+3, 15);
    }


// Ticks marks along the positive Y-axis
// Positive Y-axis of graph is negative Y-axis of the canvas
    for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, grid_size*i+0.5);
        ctx.lineTo(3, grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText((-y_axis_starting_point*i).toFixed(1), 8, grid_size*i+3);
    }

// Ticks marks along the negative Y-axis
// Negative Y-axis of graph is positive Y-axis of the canvas
    for(i=1; i<x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, -grid_size*i+0.5);
        ctx.lineTo(3, -grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText((y_axis_starting_point*i).toFixed(1), 8, -grid_size*i+3);
    }

    ctx.restore();
}
