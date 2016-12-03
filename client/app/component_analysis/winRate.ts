import { Component, OnInit } from '@angular/core'


@Component({
    selector: 'winRater',
    templateUrl: '../client/app/component_analysis/winRate.html',
    styleUrls: ['../client/app/component_analysis/winRate.css'],
})


export class WinRaterComponent implements OnInit {
    N = 10;
    ngOnInit() {

    }

    public chartData: Array<any> = [];
    public chartLabels: Array<any> = [];


    update(r) {
        if (r.length == 0) {
            this.chartData = [];
            return;
        }
        // no draw
        var x = r.filter(x => x != 0);
        var ave_win = this.process_results_ave(x);
        var accu_win = this.process_results_accu(x);
        // include draw
        var ave_win_draw = this.process_results_ave(r);
        var accu_win_draw = this.process_results_accu(r);
        this.chartData[0] = { data: ave_win.concat([0, 1]), label: "Average Winning Rate" };
        this.chartData[1] = { data: accu_win.concat([0, 1]), label: "Current Wiining Rate" };
        this.chartData[2] = { data: ave_win_draw.concat([0, 1]), label: "Average Win+Draw Rate" };
        this.chartData[3] = { data: accu_win_draw.concat([0, 1]), label: "Current Wii+Draw Rate" };
        var n = ave_win.length;
        var interval: number = Math.ceil(x.length / this.N);
        // console.log(data)
        // labels
        this.chartLabels = [];
        for (var i = 0; i < n; i += 1) {
            this.chartLabels.push("Game " + (i * interval));
        }
        // console.log("labels: ", this.lineChartLabels);
    }

    // results: [1|0|-1]
    // return: [win rate]
    process_results_ave(results) {
        var rate = [];
        var interval: number = Math.ceil(results.length / this.N);
        // console.log("interval:", interval);
        for (var i = 0; i < results.length; i += interval) {
            var period = results.slice(0, i + interval);
            var wins = period.filter(x => x >= 0);
            // console.log("period:", period)
            // console.log("wins:", wins)
            rate.push(wins.length / period.length);
        }
        return rate;
    }
    process_results_accu(results) {
        var rate = [];
        var interval: number = Math.ceil(results.length / this.N);
        // console.log("interval:", interval);
        for (var i = 0; i < results.length; i += interval) {
            var period = results.slice(i, i + interval);
            var wins = period.filter(x => x >= 0);
            // console.log("period:", period)
            // console.log("wins:", wins)
            rate.push(wins.length / period.length);
        }
        return rate;
    }


}