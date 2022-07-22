import path from "path";
//@ts-expect-error
import * as PDFServicesSdk from "@adobe/pdfservices-node-sdk";

export async function pdfExtract(): Promise<any> {
  try {
    const credentialsConfig = JSON.parse(
      `${process.env.ADOBE_CREDENTIALS_JSON}`
    );
    const credentials =
      PDFServicesSdk.Credentials.serviceAccountCredentialsBuilder()
        .withClientId(credentialsConfig.client_credentials.client_id)
        .withClientSecret(credentialsConfig.client_credentials.client_secret)
        .withPrivateKey(`${process.env.ADOBE_PRIVATE_KEY}`)
        .withOrganizationId(
          credentialsConfig.service_account_credentials.organization_id
        )
        .withAccountId(credentialsConfig.service_account_credentials.account_id)
        .build();

    const executionContext =
      PDFServicesSdk.ExecutionContext.create(credentials);
    const options =
      new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(
          PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT,
          PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES
        )
        .addElementsToExtractRenditions(
          PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType
            .FIGURES,
          PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES
        )
        .getStylingInfo(true)
        .build();
    const pdfFilePath = path.join(
      path.resolve("features/pdf-embed/sample1.pdf")
    );
    console.log("pdf file sample", pdfFilePath);
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
      input = PDFServicesSdk.FileRef.createFromLocalFile(
        pdfFilePath,
        PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
      );
    // Set operation input from a source file.
    extractPDFOperation.setInput(input);

    // Set options
    extractPDFOperation.setOptions(options);
    return await extractPDFOperation.execute(executionContext);
    // if (result && result.input && result.input.asStream) {
    //   return result.input.asStream as ReadableStream;
    // }
  } catch (err) {
    console.error(err);
  }
  return null;
}
