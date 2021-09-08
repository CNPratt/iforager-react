export function HomePage () {

    return (
        <div className="container">
        <div className="row">
        <div className="col d-flex justify-content-center mx-5 mt-5 mb-2">
            <div>This is a page built on the iNaturalist API to make it easier to find edible plants and mushrooms near you! You may click an image to be taken to the original observation in full detail.
            </div>    
        </div>
    </div>

    <div className="row">
        <div className="col d-flex justify-content-center my-2 mx-5">   
            <div>Please ensure that geolocation services are on for a seamless experience. Results may take a moment or two to display. If the results pages still seem to do nothing, you may have been temporarily denied because of call frequency. In this case, simply wait a minute or two and reload the page.
            </div>
        </div>
    </div>

    <div className="row">
        <div className="col d-flex justify-content-center my-2 mx-5">   
            <div>And as always, please forage with care! Though we do our best to include the most common and easily
                identifiable edible species, we cannot guaruntee the accuracy of the observations or the edibility of
                any foraged products that you might find. Additionally, people react to wild goods in different ways.
                Always do your own research. Additionally, we cannot guarantee that all observations are accessible to
                the public, and all local and regional foraging laws should be adhered to.
            </div>
        </div>
    </div>
    </div>
    );
}