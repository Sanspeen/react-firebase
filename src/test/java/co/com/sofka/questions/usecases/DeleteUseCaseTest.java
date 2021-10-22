package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DeleteUseCaseTest {

    @MockBean
    private AnswerRepository answerRepository;
    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    DeleteUseCase deleteQuestionUseCase;

    @Test
    @DisplayName("Eliminar por id")
    void delete(){


        var questionDTO = new QuestionDTO("abc","xxx","Es o no es?","OPEN",
                "TECNOLOGIA", "santiagoF@gmail.com");

        var answer = new AnswerDTO();
        answer.setQuestionId("abc");
        answer.setUserId("xxx");
        answer.setAnswer("No es!");

        Mockito.when(questionRepository.deleteById("abc")).thenReturn(Mono.empty());
        Mockito.when(answerRepository.deleteByQuestionId("abc")).thenReturn(Mono.empty());

        var result = deleteQuestionUseCase.apply("abc").block();

        Assertions.assertEquals(result,null);
    }

}