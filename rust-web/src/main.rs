use clap::Parser;
use thirtyfour::prelude::*;


#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    /// Name of the person to greet
    #[clap(short, long, value_parser)]
    name: String,

    #[clap(short, long, value_parser)]
    password: String,

}
#[tokio::main]
async fn main() {
    // let args = Args::parse();

    let caps = DesiredCapabilities::chrome();
    let driver = WebDriver::new("https://www.parentzone.me/", caps).await;
    driver.
    driver.goto("https://wikipedia.org").await;





}
