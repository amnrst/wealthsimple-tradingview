let symbol = '';

const tv_div = symbol => (
`<div class="tradingview-widget-container">
  <div id="tradingview_e6201" style="height: 500px"></div>
  <div class="tradingview-widget-copyright">
	<a href="https://www.tradingview.com/symbols/${symbol}/"
		rel="noopener"
		target="_blank"
	>
</div>`
)

function run() {
	setInterval(() => {
		if (window.location.href.indexOf("/app/trade/security/") == -1)
			return;

		symbol_el = document.querySelector('span[font-size="f5"]');
		if(!symbol_el || symbol == symbol_el.textContent) 
			return;

		chart_el = document.querySelector('[data-cy="timeseries-chart"]');
		if(!chart_el)
			return;

		chart_el = chart_el.parentElement.parentElement;
		symbol = symbol_el.textContent;

		console.log('hello', chart_el, symbol);
		chart_el.parentElement.insertAdjacentHTML('afterend', tv_div(`TSX-${symbol}`))

		chart_el.style.display = 'none';

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = `
			new TradingView.widget(
				{
					"autosize": true,
					"symbol": "TSX:${symbol}",
					"interval": "D",
					"timezone": "Etc/UTC",
					"theme": "dark",
					"style": "1",
					"locale": "en",
					"toolbar_bg": "#f1f3f6",
					"enable_publishing": false,
					"allow_symbol_change": true,
					"container_id": "tradingview_e6201"
				}
			);
		`
		const last_script = document.getElementsByTagName('script')[0];
		last_script.parentNode.insertBefore(script, last_script);

	}, 1000);
}

// Add tradingview script.
(function() {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = "https://s3.tradingview.com/tv.js";
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
	run();
})();


